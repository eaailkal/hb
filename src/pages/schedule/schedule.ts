import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormControl } from "@angular/forms";

// Storage
import { Storage } from '@ionic/storage';

import { HandbookDataProvider } from '../../providers/handbook-data/handbook-data';

import 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  filterControl: FormControl = new FormControl('');
  days:any;
  totalDays:Array<any>;
  // storage = new Storage(LocalStorage);
  // storage = new Storage;
  favorite:Array<any>;
  constructor(
    public nav: NavController,
    public navParams: NavParams, 
    public handbookData: HandbookDataProvider,
    private storage: Storage) {
     handbookData.getSchedule()
    .then(data => {
      this.days = data;
      this.totalDays = JSON.parse(JSON.stringify(data));
    });
        
    // Handling Favorite List
    this.storage.get('favorite')
    .then(data => {
        if(!data) {
          data = "[]";
        }
        this.favorite = JSON.parse(data);
    });
    
    // Observable for Searchbar
    this.filterControl.valueChanges
    .debounceTime(500)
    .distinctUntilChanged()
    .map(v => v.toLowerCase().trim())
    .subscribe(value => {
      this.search(value);
    });
    
  }
  
  // openSession(session) {
  //     this.nav.push(SessionDetail, {session: session});
  // }
  
  // favoriteSession(session) {
  //   let favoriteList = this.favorite.map(fav => {
  //     return fav.title
  //   });

  //   if(favoriteList.indexOf(session.title) < 0) {
  //     this.favorite.push(session);
  //     this.storage.set('favorite', JSON.stringify(this.favorite));
  //     let start_date = new Date(session.start_time);
  //     let end_date = new Date(session.end_time);
  //     Calendar.createEvent(session.title, session.place, session.abstract, start_date, end_date)
  //     .then(data => {
  //       Toast.show("Session Added to Calender", "2000", "center")
  //       .subscribe(() => {
  //       });  
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   } else {
  //       Toast.show("Already Added to Calender", "2000", "center")
  //       .subscribe(()=> {
  //       }); 
  //   }
  // }
  
  // shareSession(session) {
  //   let shareString = `Check this amazing talk, ${session.title} at Conference name on ${session.day}`;
  //   SocialSharing.share(shareString, session.title, null, session.web_url);
  // }
  
  // Search Logic
  search(value) {
    this.days = JSON.parse(JSON.stringify(this.totalDays));
    this.days = this.days.filter(day => {
        day.sessions = day.sessions.filter(session => {
          let selected = false;
          if(session.space.toLowerCase().indexOf(value) >= 0) {
            selected = true;
          }
          if(session.title.toLowerCase().indexOf(value) >= 0) {
            selected = true;
          }
          if(session.abstract && session.abstract.toLowerCase().indexOf(value) >= 0) {
            selected = true;
          }
          if(session.speakers) {
             session.speakers.forEach(speaker => {
              if(speaker.name.toLowerCase().indexOf(value) >=0) {
                selected = true;
                return;
              }
            });
          }
          return selected;
        }); 
        
        if(day.sessions.length > 0) {
          return true;  
        }
      });
  }


}
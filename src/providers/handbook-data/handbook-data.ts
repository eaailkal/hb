import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// * in case if we are using jsonp
import {Http, Jsonp} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Storage
import { Storage } from '@ionic/storage';

// import AF modules from library to provide bindings to Firebase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class HandbookDataProvider {
  news: Observable<any>;
  items: FirebaseListObservable<any>;
  events: FirebaseListObservable<any>;

  //timetable
  public timetable: any;
  firebase_url: string = '/test';
  url:string = 'http://lanyrd.com/2015/campjsnews/schedule/481ea3897063c7d5.v1.json?callback=JSONP_CALLBACK';
  offline_url:string = 'data/offline_data.json';
  request:any;
  data:any;
  
  constructor(
    // * in case if we are using jsonp
    public jsonp: Jsonp,
    public http: Http,
    private storage: Storage,
    public afDB: AngularFireDatabase) {
      // this.request = db.list(this.url);
      // * in case if we are using jsonp
      this.request = this.jsonp.request(this.url);
  }

  // load and process data code source 
  // https://github.com/ionic2blueprints/conference-app/blob/master/app/pages/schedule/schedule.ts
  load() {
      if(this.data) {
        return Promise.resolve(this.data);
      }
      
      let promise = new Promise((resolve) => {
          this.request.subscribe(data => {
            // this.data = this.processData(data); 
            this.data = this.processData(data.json());

            // To make sure the storage system is ready before using it
            this.storage.ready().then(() => {
              this.storage.set('offline_data', JSON.stringify(this.data));
              this.storage.set('classid', '1md16e2');
            });
            resolve(this.data);
          },
          error => {
             this.storage.get('offline_data')
             .then(data => {
                if(data) {
                  this.data = JSON.parse(data);
                  resolve(this.data);
                } else {
                  this.http.get(this.offline_url).subscribe(data => {
                    this.data = this.processData(data.json());
                    this.storage.set('offline_data', JSON.stringify(this.data));
                    resolve(this.data);
                  });
                }
              });
          });
      });
      
      return promise;
  }

  processData(data) {
      data.speakers = [];
      data.speakersName = [];
      data.sessions.forEach(day => {
        day.display = true;
        day.sessions.forEach(session => {
          session.speakers.forEach(newSpeaker => {
             let index = data.speakersName.indexOf(newSpeaker.name);
             if( index < 0) {
                 newSpeaker.sessions = [];
                 newSpeaker.sessions.push({title: session.title, abstract:session.abstract});
                 data.speakersName.push(newSpeaker.name);
                 data.speakers.push(newSpeaker);
             } else {
                 data.speakers[index].sessions.push({title: session.title, abstract:session.abstract});
             }
             
          });
        });
      })
      delete data.speakersName;
      return data;
  }

  // schedule
  getSchedule() {
      return this.load().then(data => {
        return data.sessions;
      });
  }

  getSpeakers() {
      return this.load().then(data => {
        let newSpeakerArray = this.addAlphabets(this.sort(data.speakers));  
        return newSpeakerArray;
      });
    }
   
  sort(speakers) {
      let list = speakers;
      list.sort(function(a, b) {
        if(a.name > b.name) {
          return 1;
        }
        if(a.name < b.name) {
          return -1;
        }
        return 0;
      });
      return list;
  }

  addAlphabets(items) {
      let currentChar = "";
      let newArray = [];
      items.forEach(function(item, index) {
        var char = item.name[0].toLowerCase();
        if(currentChar != char) {
            newArray.push({type:"title", value: char.toUpperCase()});
            currentChar = char;
        }
        newArray.push(item);
      });
      
      return newArray;
  } 
  
  // code for news from locally stored json
  getRemoteData(){
    this.http.get('assets/data/example.json')
      // In Javascript, mapping is a method available on arrays which allows you to “map” or “transform” each value in that array. We are not mapping an array, we are mapping an observable – this functionality is provided by the RxJS library (which is included in Ionic 2 & Angular 2), it is not in Javascript by default.

      // .map(res => res.json())  

      // returns only news
      .map(res => res.json().news) 
      
      // res => res.json()
      // is shorthand for
      // (res) => { return res.json(); }

      // we know get will return an observable, so we need to subscribe to an Observable
      .subscribe(data => {
      this.news = data;
      console.log(this.news);
    });
  }

  // old code for news from Firebase
  getNews(){
    // this.items = this.db.list('news');
    console.log('News view');
  }

  // events are loaded from Firebase
  getEvents(){
    this.events = this.afDB.list('events');
    console.log('Events view');
    console.log(this.events);
  }

  presentFilter() {
    // more code
  }

  addItem(post){
  }

}

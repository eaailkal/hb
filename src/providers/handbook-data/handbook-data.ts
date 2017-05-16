import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// import AF modules from library to provide bindings to Firebase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class HandbookDataProvider {

  items: FirebaseListObservable<any>;

//   constructor(public http: Http) {
  constructor(
    // db: AngularFireDatabase
    public http: Http,
    public db: AngularFireDatabase) {
  }

  // load() {}

  // getRemoteData(){
  //   this.http.get('https://handbook-28b6f.firebaseio.com/')
  //     .map(res => res.json())
  //     .subscribe(data => {
  //     console.log(data);
  //   });

  // }

  // public getStories(): Observable<any> {
  //   return this.http.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  getTimetable(){
    this.items = this.db.list('timetable');
    console.log('Timetable view');
  }

  getEvents(){
    this.items = this.db.list('events');
    console.log('Events view');
  }

  presentFilter() {
    // more code
  }

  addItem(post){
  }

}

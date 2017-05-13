import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

// import AF modules from library to provide bindings to Firebase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class HandbookDataProvider {

  items: FirebaseListObservable<any>;

//   constructor(public http: Http) {
  constructor(
    // db: AngularFireDatabase
    public db: AngularFireDatabase) {
  }

  load() {}

  getEvents(){
    this.items = this.db.list('/events');
    console.log('Events view');
  }

  getTimetable(){
    this.items = this.db.list('/VCALENDAR/0/EVENT');
    console.log('Timetable view');
  }
}

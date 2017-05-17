import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// import AF modules from library to provide bindings to Firebase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class HandbookDataProvider {
  news: Observable<any>;
  items: FirebaseListObservable<any>;
  constructor(
    public http: Http,
    public db: AngularFireDatabase) {
  }

  // load() {}

  // code for news from json
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
    this.items = this.db.list('news');
    console.log('News view');
  }

  // events are loaded from Firebase
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// event details page and handbook data provider
// import { EventDetailsPage } from '../event-details/event-details';
import { HandbookDataProvider } from '../../providers/handbook-data/handbook-data';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  // define the events variable that we referenced in our template
  events: Array<Object> = []

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  private handbookData: HandbookDataProvider) {
  }

  // getEvents () {
  //   this.handbookData.getEvents().then(theResult => {
  //     this.events = theResult;
  //   })
  // }

  ionViewDidLoad() {
    this.getEvents();
    //  this.handbookData.getEvents().then(theResult => {
    //  this.events = theResult;
    //})
  }
  
  getEvents () {
    this.handbookData.getEvents();
  }

  getEventDetails(theEventData) {
    console.log(theEventData);
    this.navCtrl.push("EventDetailsPage", { handbookData: theEventData });
  }

}
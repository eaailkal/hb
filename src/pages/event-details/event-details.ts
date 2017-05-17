import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})

export class EventDetailsPage {
  eventDetails: Object;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.eventDetails = navParams.data;
    // this.eventDetails = navParams.data.HandbookDataProvider;
    console.log(this.eventDetails);
  }

  ionViewDidLoad() {
  //  console.log(this.eventDetails);
  }

}


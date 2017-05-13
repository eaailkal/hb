import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HandbookDataProvider } from '../../providers/handbook-data/handbook-data';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  private handbookData: HandbookDataProvider) {
  }

  ionViewDidLoad() {
    this.getEvents();
  }
  
  getEvents () {
    this.handbookData.getEvents();
  }

}

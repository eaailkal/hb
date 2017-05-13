import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HandbookDataProvider } from '../../providers/handbook-data/handbook-data';

@IonicPage()
@Component({
  selector: 'page-timetable',
  templateUrl: 'timetable.html',
})
export class TimetablePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    // public handbookData: HandbookDataProvider
    private handbookData: HandbookDataProvider) {
  }

  ionViewDidLoad() {
    this.getTimetable();
  }

  getTimetable () {
    this.handbookData.getTimetable();
  }

  addPost(post){
    this.handbookData.addItem(post);
  }

}

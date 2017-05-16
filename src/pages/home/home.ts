import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import { HandbookDataProvider } from '../../providers/handbook-data/handbook-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController) {
    // public handbookData: HandbookDataProvider
    // public handbookData: HandbookDataProvider) {
  }

  ionViewDidLoad() {
  //  this.handbookData.getRemoteData();
  }

}

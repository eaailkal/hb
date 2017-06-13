import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { HandbookDataProvider } from '../../providers/handbook-data/handbook-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('adSlider') slider: Slides;

  constructor(
    public navCtrl: NavController,
    public handbookData: HandbookDataProvider) {}

  ionViewDidLoad() {

    // saving data to storage

    // storage.ready().then(() => {
    //   this.storage.set('name', 'Mr. Ionitron');
    // });

    // loading name from storage

    // this.storage.get('name').then((name) => {
    // console.log('Me: Hey, ' + name + '! You have a very nice name.');
    // });
  }

}

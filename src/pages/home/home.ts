import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Platform } from 'ionic-angular';
import { HandbookDataProvider } from '../../providers/handbook-data/handbook-data';
// Storage
import { Storage } from '@ionic/storage';
// Analytics
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userName: any;

  @ViewChild('adSlider') slider: Slides;

  constructor(
    public navCtrl: NavController,
    public handbookData: HandbookDataProvider,
    public platform: Platform,
    public storage: Storage,
    private ga: GoogleAnalytics) {

    this.platform.ready().then(() => {
      this.ga.trackView("Home Page");
    });
  
  }

  today: number = Date.now();

  trackEvent() {
    let active = this.slider.getActiveIndex();
    this.platform.ready().then(() => {
      this.ga.trackEvent("Slider", "Slider-Changed", "Label", active);
    });
  }

  ionViewDidLoad() {

    // saving data to storage

    this.storage.ready().then(() => {
      this.storage.set('name', 'Emils');
    });

    // loading name from storage
    this.storage.get('name').then((name) => {
      console.log('Me: Hey, ' + name + '! You have a very nice name.');
      this.userName = name;
    });
  
  }

}

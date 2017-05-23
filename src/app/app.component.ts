import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pages
import { HomePage } from '../pages/home/home';
import { EventsPage } from '../pages/events/events';
import { TimetablePage } from '../pages/timetable/timetable';
import { ListPage } from '../pages/list/list';
import { SchedulePage } from '../pages/schedule/schedule';
import { TeachersPage } from '../pages/teachers/teachers';
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Timetable', component: TimetablePage, icon: 'calendar' },
      { title: 'Schedule', component: SchedulePage, icon: 'eye' },
      { title: 'Teachers', component: TeachersPage, icon: 'people' },
      { title: 'Events & news', component: EventsPage, icon: 'megaphone' },
      { title: 'Student handbook', component: ListPage, icon: 'book' },
      { title: 'About', component: AboutPage, icon: 'information-circle' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

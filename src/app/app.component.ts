import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
// Storage
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Analytics
import { GoogleAnalytics } from '@ionic-native/google-analytics';

// Pages
import { HomePage } from '../pages/home/home';
import { EventsPage } from '../pages/events/events';
import { TimetablePage } from '../pages/timetable/timetable';
import { AssignmentsPage } from '../pages/assignments/assignments';
import { ListPage } from '../pages/list/list';
// import { SchedulePage } from '../pages/schedule/schedule';
import { TeachersPage } from '../pages/teachers/teachers';
import { AboutPage } from '../pages/about/about';
import { WalkThroughPage } from '../pages/walkthrough/walkthrough';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public storage: Storage,
    private ga: GoogleAnalytics,
    public splashScreen: SplashScreen
    ) {
    // Check if the user has already seen the walkthrough
    this.storage.get('hasSeenWalkThrough').then((hasSeenWalkThrough) => {
        if (hasSeenWalkThrough) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = WalkThroughPage;
        }
        this.initializeApp();
    })
    
    // this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Timetable', component: TimetablePage, icon: 'calendar' },
      { title: 'Assignments', component: AssignmentsPage, icon: 'ios-create-outline' },
     // { title: 'Schedule', component: SchedulePage, icon: 'eye' },
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

      // Google Analytics
      return this.ga.startTrackerWithId("UA-101018990-1")
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.setAppVersion('0.0.2');
          return this.ga.enableUncaughtExceptionReporting(true)
        }).then((_success) => {
          console.log("startTrackerWithId success")
        }).catch((_error) => {
          console.log("enableUncaughtExceptionReporting", _error)
        })

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

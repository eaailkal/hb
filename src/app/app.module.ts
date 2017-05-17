import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpModule} from '@angular/http';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventsPage } from '../pages/events/events';
// import { EventDetailsPage } from '../pages/event-details/event-details';
import { TimetablePage } from '../pages/timetable/timetable';
import { AboutPage } from '../pages/about/about';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Provider
import { HandbookDataProvider } from '../providers/handbook-data/handbook-data';
import { DataNewProvider } from '../providers/data-new/data-new';
// import { UserData } from '../providers/data-new/user-data';

// Import AF module and AF database module
// Docs https://github.com/angular/angularfire2/blob/master/docs/Auth-with-Ionic3-Angular4.md
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';

// Firebase apiKey
export const firebaseConfig = {
    apiKey: "AIzaSyBRG9caQVVqS2IRv2nS6Z0m6LNiJYUkvFQ",
    authDomain: "handbook-28b6f.firebaseapp.com",
    databaseURL: "https://handbook-28b6f.firebaseio.com",
    projectId: "handbook-28b6f",
    storageBucket: "handbook-28b6f.appspot.com",
    messagingSenderId: "550218362488"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventsPage,
    // EventDetailsPage,
    TimetablePage,
    AboutPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // Initialize app, by adding AF module and AF database module in the "imports" array
    AngularFireModule.initializeApp(firebaseConfig), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventsPage,
    // EventDetailsPage,
    TimetablePage,
    AboutPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HandbookDataProvider,
    DataNewProvider
    // UserData
  ]
})
export class AppModule {}

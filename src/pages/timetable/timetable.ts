import { Component, ViewChild } from '@angular/core';
import { IonicPage, List, NavController, NavParams } from 'ionic-angular';

// import { HandbookDataProvider } from '../../providers/handbook-data/handbook-data';
import { DataNewProvider } from '../../providers/data-new/data-new';
// import { UserData } from '../../providers/data-new/user-data';

@IonicPage()
@Component({
  selector: 'page-timetable',
  templateUrl: 'timetable.html',
})

export class TimetablePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  period: string = "today";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dataNew: DataNewProvider
    // public userData: UserData
  ) {
    // this.period = "today";
    // public handbookData: HandbookDataProvider
    // private handbookData: HandbookDataProvider) {
  }

  ionViewDidLoad() {
    // this.app.setTitle('Schedule');
    this.updateSchedule();
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.dataNew.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }


  // old code

  // ionViewDidLoad() {
  //   this.getTimetable();
  // }

  getTimetable () {
  //  this.handbookData.getTimetable();
  }

  addPost(post){
  //  this.handbookData.addItem(post);
  }

}

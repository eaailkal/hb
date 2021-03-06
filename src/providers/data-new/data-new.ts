import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { UserData } from './user-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class DataNewProvider {
  
  data: any;

  constructor(
    public http: Http,
    // public user: UserData
    ) {} 
  

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking teachers to sessions
    this.data = data.json();

    this.data.topic = [];

    // loop through each day in the timetable
    this.data.timetable.forEach((day: any) => {
      // loop through each timeline group in the day
      day.groups.forEach((group: any) => {
        // loop through each session in the timeline group
        group.sessions.forEach((session: any) => {
          session.teachers = [];
          if (session.teacherNames) {
            session.teacherNames.forEach((teacherName: any) => {
              let teacher = this.data.teachers.find((s: any) => s.name === teacherName);
              if (teacher) {
                session.teachers.push(teacher);
                teacher.sessions = teacher.sessions || [];
                teacher.sessions.push(session);
              }
            });
          }

          if (session.topic) {
            session.topic.forEach((topicItem: any) => {
              if (this.data.topic.indexOf(topicItem) < 0) {
                this.data.topic.push(topicItem);
              }
            });
          }
        });
      });
    });

    return this.data;
  }

  //
  getTimeline(dayIndex: number, queryText = '', excludeTracks: any[] = [], segment = 'all') {
    return this.load().map((data: any) => {
      let day = data.timetable[dayIndex];
      day.shownSessions = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      day.groups.forEach((group: any) => {
        group.hide = true;

        group.sessions.forEach((session: any) => {
          // check if this session should show or not
          this.filterSession(session, queryWords, excludeTracks, segment);

          if (!session.hide) {
            // if this session is not hidden then this group should show
            group.hide = false;
            day.shownSessions++;
          }
        });

      });

      return day;
      //return data.timetable;
    });
  }

  //
  filterSession(session: any, queryWords: string[], excludeTracks: any[], segment: string) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.topic.forEach((trackName: string) => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });


    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test

    // let matchesSegment = false;
    // if (segment === 'favorites') {
    //   if (this.user.hasFavorite(session.name)) {
    //     matchesSegment = true;
    //   }
    // } else {
    //   matchesSegment = true;
    // }

    let matchesSegment = true;


    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

  getTeachers() {
    return this.load().map((data: any) => {
      return data.teachers.sort((a: any, b: any) => {
        let aName = a.name.split(' ').pop();
        let bName = b.name.split(' ').pop();
        return aName.localeCompare(bName);
      });
    });
  }

  // 
  getTopics() {
    return this.load().map((data: any) => {
      return data.topic.sort();
    });
  }

  // 
  getMap() {
    return this.load().map((data: any) => {
      return data.map;
    });
  }

}
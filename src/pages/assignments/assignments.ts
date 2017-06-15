import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-assignments',
  templateUrl: 'assignments.html',
})
export class AssignmentsPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignmentsPage');

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["Awaiting", "Completed"],
                datasets: [{
                    label: 'Assignments overview',
                    data: [3, 2],
                    backgroundColor: [
                        'rgba(242, 69, 56, 0.2)',
                        'rgba(117, 179, 192, 1)'
                    ],
                    hoverBackgroundColor: [
                        "#f24538",
                        "#5897af"   // #5897af
                    ]
                }]
            }
 
        });

  }

}

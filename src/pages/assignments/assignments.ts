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
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(117, 179, 192, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#75b3c0"
                    ]
                }]
            }
 
        });

  }

}

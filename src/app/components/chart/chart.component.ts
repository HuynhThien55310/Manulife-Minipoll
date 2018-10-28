import { PollService } from './../../services/poll.service';
import { Poll } from './../../classes/poll';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  pollTT = <Poll>{};
  pollCB = <Poll>{};
  pollMH = <Poll>{};
  timett: string;
  timecb: string;
  timemh: string;

  ttQty: number;
  cbQty: number;
  mhQty: number;

  data: any;
  chartOptions: any;

  chart = [];
  constructor(
    private formBuilder: FormBuilder,
    private pollService: PollService
  ) {}

  ngOnInit() {
    // Than trong
    this.pollService.getTT().subscribe(polls => {
      this.pollTT = this.cast(polls[0]);
      polls.forEach(poll => {
        if (
          Math.abs(this.pollTT.predict - polls.length) >
          Math.abs(poll['predict'] - polls.length)
        ) {
          this.pollTT = this.cast(poll);
        } else if (
          Math.abs(this.pollTT.predict - polls.length) ===
          Math.abs(poll['predict'] - polls.length)
        ) {
          if (this.pollTT.hour > poll['hour']) {
            this.pollTT = this.cast(poll);
          } else if (this.pollTT.minute > poll['minute']) {
            this.pollTT = this.cast(poll);
          }
        }
      });

      this.timett = this.setTime(this.pollTT.hour, this.pollTT.minute);
      this.ttQty = polls.length;
      console.log(this.pollTT, this.ttQty);

      // Can bang
      this.pollService.getCB().subscribe(cbpolls => {
        this.pollCB = this.cast(cbpolls[0]);
        cbpolls.forEach(cbpoll => {
          if (
            Math.abs(this.pollCB.predict - cbpolls.length) >
            Math.abs(cbpoll['predict'] - cbpolls.length)
          ) {
            this.pollCB = this.cast(cbpoll);
          } else if (
            Math.abs(this.pollCB.predict - cbpolls.length) ===
            Math.abs(cbpoll['predict'] - cbpolls.length)
          ) {
            if (this.pollCB.hour > cbpoll['hour']) {
              this.pollCB = this.cast(cbpoll);
            } else if (this.pollCB.minute > cbpoll['minute']) {
              this.pollCB = this.cast(cbpoll);
            }
          }
        });

        this.timecb = this.setTime(this.pollCB.hour, this.pollCB.minute);
        this.cbQty = cbpolls.length;
        console.log(this.pollCB);
        // Mao hiem
        this.pollService.getMH().subscribe(mhpolls => {
          this.pollMH = this.cast(mhpolls[0]);
          mhpolls.forEach(mhpoll => {
            if (
              Math.abs(this.pollMH.predict - mhpolls.length) >
              Math.abs(mhpoll['predict'] - mhpolls.length)
            ) {
              this.pollMH = this.cast(mhpoll);
            } else if (
              Math.abs(this.pollMH.predict - mhpolls.length) ===
              Math.abs(mhpoll['predict'] - mhpolls.length)
            ) {
              if (this.pollMH.hour > mhpoll['hour']) {
                this.pollMH = this.cast(mhpoll);
              } else if (this.pollMH.minute > mhpoll['minute']) {
                this.pollMH = this.cast(mhpoll);
              }
            }
          });

          this.timemh = this.setTime(this.pollMH.hour, this.pollMH.minute);
          this.mhQty = mhpolls.length;
          console.log(this.pollMH);
          this.data = {
            label: 'Số nhà đầu tư',
            data: [this.ttQty, this.cbQty, this.mhQty, 0],
            backgroundColor: 'rgba(58, 4, 55, 1)',
            borderColor: 'rgba(99, 132, 0, 1)'
          };

          this.chartOptions = {
            scales: {
              yAxes: [
                {
                  barPercentage: 0.5
                }
              ]
            },
            elements: {
              rectangle: {
                borderSkipped: 'left'
              }
            }
          };

          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
              labels: [
                'Nhà đầu tư Thận trọng',
                'Nhà đầu tư Cân bằng',
                'Nhà đầu tư Mạo hiểm'
              ],
              datasets: [this.data]
            }
            // options: this.chartOptions
          });
        });
      });
    });

    // Chart
    // this.ttQty = 70;
    // this.cbQty = 50;
    // this.mhQty = 10;

  }

  cast(obj) {
    const poll = <Poll>{};
    poll.email = obj.email;
    poll.fullName = obj.fullName;
    poll.predict = obj.predict;
    poll.investion = obj.investion;
    poll.hour = obj.hour;
    poll.minute = obj.minute;
    poll.phone = obj.phone;
    return poll;
  }

  setTime(hour, minute) {
    let time = '';
    if (hour < 10) {
      time = '0' + hour + ':';
    } else {
      time = hour + ':';
    }
    if (minute < 10) {
      time = time + '0' + minute;
    } else {
      time = time + minute;
    }
    return time;
  }
}

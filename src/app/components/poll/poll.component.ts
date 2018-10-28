import { Poll } from './../../classes/poll';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  poll = <Poll>{};
  pollForm: FormGroup;
  isValid = true;
  time: string;

  private ttCollection: AngularFirestoreCollection<Poll>;
  private cbCollection: AngularFirestoreCollection<Poll>;
  private mhCollection: AngularFirestoreCollection<Poll>;


  constructor(private formBuilder: FormBuilder, private readonly afs: AngularFirestore) {
    this.ttCollection = afs.collection<Poll>('than_trong');
    this.cbCollection = afs.collection<Poll>('can_bang');
    this.mhCollection = afs.collection<Poll>('mao_hiem');
  }

  ngOnInit() {
    this.buildForm();

  }

  vote() {
    this.poll.email = this.pollForm.value.email;
    this.poll.fullName = this.pollForm.value.fullName;
    this.poll.phone = this.pollForm.value.phone;
    this.poll.yearOfBirth = this.pollForm.value.yearOfBirth;
    this.poll.predict = Number(this.pollForm.value.predict);
    this.poll.hour = new Date().getHours();
    this.poll.minute = new Date().getMinutes();
    console.log(this.poll);
    if (this.poll.email === '' || this.poll.fullName === ''
    || this.poll.phone === '' || this.poll.yearOfBirth === ''
    || this.pollForm.value.predict === '' || this.pollForm.value.pcdt_s === '') {
      this.isValid = false;
      console.log('not pass');
    } else {
      this.isValid = true;

        const type = Number(this.pollForm.value.pcdt_s);
        // this.time = this.poll.time.getHours() + ':' + this.poll.time.getMinutes();

        if (this.poll.hour < 10) {
            this.time = '0' + this.poll.hour + ':';
        } else {
          this.time = this.poll.hour + ':';
        }
        if (this.poll.minute < 10) {
          this.time = this.time + '0' + this.poll.minute;
        } else {
          this.time = this.time + this.poll.minute;
        }


        switch (type) {
          // 1 for Thận trọng 2 for Cân bằng 3 for Mạo hiểm
            case 1:
              this.poll.investion = 'Thận trọng';
              this.ttCollection.add(this.poll).then(res => {
                // this.print();
                location.reload();
              });
              break;
            case 2:
              this.poll.investion = 'Cân bằng';
              this.cbCollection.add(this.poll).then(res => {
                // this.print();
                location.reload();
            });
              break;
            case 3:
              this.poll.investion = 'Mạo hiểm';
              this.mhCollection.add(this.poll).then(res => {
                // this.print();
                location.reload();
              });
              break;
        }


    }
  }

  buildForm(): void {
    this.pollForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'phone': ['', [Validators.required]],
      'fullName': ['', [Validators.required]],
      'yearOfBirth': ['', [Validators.required]],
      'predict': ['', [Validators.required]],
      'pcdt_s': ['', [Validators.required]],

    });
  }
  print(): void {
    let printContents, popupWin;
    printContents =
    `<div>
    <h1>PHIẾU IN KẾT QUẢ</h1>
    <span>Tên nhà đâu tư: </span> <label>${this.poll.fullName}</label>
    <p></p>
    <span>Bạn là: </span><label>Nhà đầu tư ${this.poll.investion}</label>
    <p></p>
    <span>Số lượng dự đoán: </span><label>${this.poll.predict}</label>
    <p></p>
    <span>Thời gian: </span><label>${this.time}</label>
    </div>`;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=450px,width=450px');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Minipoll</title>
          <style>
          h1 {
            text-align: center;
          }
          div {
            height=450px;
            width=450px;
          }
          label {
            font-size: 20px;
          }
          span {
            font-weight: bold;
            font-size: 20px;
          }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}

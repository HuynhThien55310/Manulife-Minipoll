import { Poll } from './../../classes/poll';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { XRegExp} from 'xregexp';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';
import { DialogComponent } from '../poll/poll.component';
@Component({
  selector: 'app-ipoll',
  templateUrl: './ipoll.component.html',
  styleUrls: ['./ipoll.component.css']
})
export class IpollComponent implements OnInit {
  poll = <Poll>{};
  pollForm: FormGroup;
  isValid = true;
  time: string;
  message = '';
  FULLNAME_PATTERN =
            '^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
            'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
            'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$';
  private ttCollection: AngularFirestoreCollection<Poll>;
  private cbCollection: AngularFirestoreCollection<Poll>;
  private mhCollection: AngularFirestoreCollection<Poll>;


  constructor(private formBuilder: FormBuilder, private readonly afs: AngularFirestore, public dialog: MatDialog) {
    this.ttCollection = afs.collection<Poll>('than_trong');
    this.cbCollection = afs.collection<Poll>('can_bang');
    this.mhCollection = afs.collection<Poll>('mao_hiem');
  }

  ngOnInit() {
    this.buildForm();
    // this.openDialog();
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
      this.message = 'Vui lòng nhập đủ thông tin';
      console.log('not pass');
    } else {
      if (isNaN(this.pollForm.value.predict) === true || this.poll.predict < 0) {
        this.message = 'Dự đoán không hợp lệ';
        return;
      }

      if (isNaN(this.pollForm.value.yearOfBirth) === true || Number(this.poll.yearOfBirth) < 1900 || Number(this.poll.yearOfBirth) > 2000) {
        console.log('vao');
        this.message = 'Năm sinh không hợp lệ';
        return;
      }

      if (isNaN(this.pollForm.value.phone) === true || this.pollForm.value.phone.length < 9 || this.pollForm.value.phone.length > 11) {
        console.log('vao');
        this.message = 'Số điện thoại không hợp lệ';
        return;
      }

      if (this.pollForm.invalid) {
        console.log('vao');
        this.message = 'Email không hợp lệ';
        return;
      }

      if (!this.poll.fullName.match(this.FULLNAME_PATTERN) || this.poll.fullName.length <= 3) {
        console.log('vao');
        this.message = 'Họ và tên không hợp lệ';
        return;
      }
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
                // location.reload();
                this.openDialog();
              });
              break;
            case 2:
              this.poll.investion = 'Cân bằng';
              this.cbCollection.add(this.poll).then(res => {
                // this.print();
                // location.reload();
                this.openDialog();
            });
              break;
            case 3:
              this.poll.investion = 'Mạo hiểm';
              this.mhCollection.add(this.poll).then(res => {
                // this.print();
                // location.reload();
                this.openDialog();
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
    <body onload='window.print();window.close()'>${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  openDialog() {
    // this.dialog.open(DialogComponent);
    const dialogRef = this.dialog.open(DialogComponent, {
      // height: '300px',
      width: '450px',
    });


  }
}

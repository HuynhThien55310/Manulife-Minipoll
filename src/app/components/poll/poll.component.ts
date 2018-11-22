import { Poll } from './../../classes/poll';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { XRegExp} from 'xregexp';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';
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
  message = '';
  score = 0;
  FULLNAME_PATTERN =
            '^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
            'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
            'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$';
  private ttCollection: AngularFirestoreCollection<Poll>;
  private cbCollection: AngularFirestoreCollection<Poll>;
  private mhCollection: AngularFirestoreCollection<Poll>;


  constructor(private formBuilder: FormBuilder, private readonly afs: AngularFirestore, public dialog: MatDialog) {
    this.ttCollection = afs.collection<Poll>('than_trong_HN');
    this.cbCollection = afs.collection<Poll>('can_bang_HN');
    this.mhCollection = afs.collection<Poll>('mao_hiem_HN');
  }

  ngOnInit() {
    this.buildForm();
    // this.openDialog();
  }

  vote() {
    this.poll.fullName = this.pollForm.value.fullName;
    this.poll.phone = this.pollForm.value.phone;
    this.poll.hour = new Date().getHours();
    this.poll.minute = new Date().getMinutes();
    console.log(this.poll);
    if (
      this.poll.fullName === '' ||
      this.poll.phone === '' ||
      this.pollForm.value.pcdt_1 === '' ||
      this.pollForm.value.pcdt_2 === ''
    ) {
      this.message = 'Vui lòng nhập đủ thông tin';
      console.log('not pass');
    } else {

      if (
        isNaN(this.pollForm.value.phone) === true ||
        this.pollForm.value.phone.length < 9 ||
        this.pollForm.value.phone.length > 11
      ) {
        console.log('vao');
        this.message = 'Số điện thoại không hợp lệ';
        return;
      }

      if (
        !this.poll.fullName.match(this.FULLNAME_PATTERN) ||
        this.poll.fullName.length <= 3
      ) {
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

      // this.score = Number(Math.abs(this.pollForm.value.pcdt_1) + this.pollForm.value.pcdt_2);
      if (this.score >= 2 && this.score <= 4) {
        // THAN TRONG
        this.ttCollection.add(this.poll).then(res => {
          location.reload();
        });
        console.log(this.poll);
      } else if (this.score >= 5 && this.score <= 7) {
        // CAN BANG
        this.cbCollection.add(this.poll).then(res => {
          location.reload();
        });
        console.log(this.poll);
      } else {
        // MAO HIEM
        this.mhCollection.add(this.poll).then(res => {
          location.reload();
        });
        console.log(this.poll);
      }
    }
  }

  buildForm(): void {
    this.pollForm = this.formBuilder.group({
      phone: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      predict: ['', [Validators.required]],
      pcdt_1: ['', [Validators.required]],
      pcdt_2: ['', [Validators.required]]
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
    this.score =
      Number(Math.abs(this.pollForm.value.pcdt_1)) +
      Number(this.pollForm.value.pcdt_2);
    console.log(this.score);
    this.poll.fullName = this.pollForm.value.fullName;
    this.poll.phone = this.pollForm.value.phone;
    this.poll.hour = new Date().getHours();
    this.poll.minute = new Date().getMinutes();
    console.log(this.poll);
    if (
      this.poll.fullName === '' ||
      this.poll.phone === '' ||
      this.pollForm.value.pcdt_1 === '' ||
      this.pollForm.value.pcdt_2 === ''
    ) {
      this.message = 'Vui lòng nhập đủ thông tin';
      console.log('not pass');
    } else {
      if (this.score >= 2 && this.score <= 4) {
        // THAN TRONG
        this.poll.investion = 'Thận trọng';
      } else if (this.score >= 5 && this.score <= 7) {
        // CAN BANG
        this.poll.investion = 'Cân bằng';
      } else {
        // MAO HIEM
        this.poll.investion = 'Mạo hiểm';
      }
      const dialogRef = this.dialog.open(DialogComponent, {
        height: '500px',
        width: '500px',
        data: this.poll.investion.toUpperCase()
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.poll.predict = dialogRef.componentInstance.getPredict();
        console.log(dialogRef.componentInstance.getPredict());
        this.vote();
      });
    }

  }


}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html'
})
export class DialogComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<DialogComponent>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: string) { }
  public investType = '';
  public message = '';
  dialogForm: FormGroup;
  ngOnInit() {
    this.buildForm();
    this.investType = this.data;
  }

  closeDialog() {
    if (isNaN(this.dialogForm.value.predict) === true || Number(this.dialogForm.value.predict) < 0) {
      this.message = 'Dự đoán không hợp lệ';
      return;
    }
    this.matDialogRef.close();
  }

  buildForm(): void {
    this.dialogForm = this.formBuilder.group({
      'predict': ['', [Validators.required]]
    });
  }

  getPredict() {
    return Number(this.dialogForm.value.predict);
  }
}

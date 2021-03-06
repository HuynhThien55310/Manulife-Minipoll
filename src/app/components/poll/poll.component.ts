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
    this.poll.email = this.pollForm.value.email;
    console.log(this.poll);
    if (
      this.poll.fullName === '' ||
      this.pollForm.value.pcdt_1 === '' ||
      this.pollForm.value.pcdt_2 === ''
    ) {
      this.message = 'Vui lòng nhập đủ thông tin';
      console.log('not pass');
    } else {

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
      email: ['', ],
      phone: ['', ],
      fullName: ['', [Validators.required]],
      pcdt_1: ['', [Validators.required]],
      pcdt_2: ['', [Validators.required]]
    });
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
      this.pollForm.value.pcdt_1 === '' ||
      this.pollForm.value.pcdt_2 === ''
    ) {
      this.message = 'Vui lòng nhập đủ thông tin';
      console.log('not pass');
    } else {

      if (
        !this.poll.fullName.match(this.FULLNAME_PATTERN) ||
        this.poll.fullName.length <= 3
      ) {
        console.log('vao');
        this.message = 'Họ và tên không hợp lệ';
        return;
      }
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
        width: '650px',
        data: this.score
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        this.poll.predict = dialogRef.componentInstance.getPredict();
        // console.log(dialogRef.componentInstance.getPredict());
        // this.vote();

        // open new dialog
        const tksdialogRef = this.dialog.open(TksDialogComponent, {
        });
        tksdialogRef.afterClosed().subscribe(res => {
          console.log('The dialog was closed');
          // this.poll.predict = dialogRef.componentInstance.getPredict();
          // console.log(dialogRef.componentInstance.getPredict());
          this.vote();
        });
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
    @Inject(MAT_DIALOG_DATA) public data: Number) { }
  public investType = '';
  public message = '';
  public typeColor = '';
  dialogForm: FormGroup;
  ngOnInit() {
    this.buildForm();
    if (this.data >= 2 && this.data <= 4) {
      // THAN TRONG
      this.investType = 'THẬN TRỌNG';
      this.typeColor = '#06c7ba';
    } else if (this.data >= 5 && this.data <= 7) {
      // CAN BANG
      this.investType = 'CÂN BẰNG';
      this.typeColor = '#F49600';
    } else {
      // MAO HIEM
      this.investType = 'MẠO HIỂM';
      this.typeColor = '#FF7796';
    }
  }

  closeDialog() {
    if (isNaN(this.dialogForm.value.predict) === true || Number(this.dialogForm.value.predict) <= 0) {
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

@Component({
  selector: 'app-tks-dialog',
  templateUrl: 'tksDialog.html'
})
export class TksDialogComponent implements OnInit {
  constructor(private matDialogRef: MatDialogRef<DialogComponent>) { }
  ngOnInit() {
  }

}

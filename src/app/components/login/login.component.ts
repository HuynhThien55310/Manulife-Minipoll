import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message = '';
  email: string;
  password: string;
  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {

   }

  ngOnInit() {
    this.buildForm();
    console.log(this.afAuth.user);

  }

  login() {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.message = '';
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).catch(error => {
      if (error != null) {
        this.message = 'Sai email hoặc mật khẩu';
      }
    }).then(res => {
      console.log(this.message);
      if (this.message === '') {
        this.router.navigate(['poll']);
      }
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', [
          Validators.required,
          Validators.email
        ]
      ],
      'password': ['', [
        Validators.required
      ]
    ],
    });


  }
}

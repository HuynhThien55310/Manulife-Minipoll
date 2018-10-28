import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PollComponent } from './components/poll/poll.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import { ChartComponent } from './components/chart/chart.component';
import { PollService } from './services/poll.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PollComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatInputModule
  ],
  providers: [PollService],
  bootstrap: [AppComponent]
})
export class AppModule { }

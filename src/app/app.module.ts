import { MatDialogModule } from '@angular/material';
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
import { PollComponent, DialogComponent, TksDialogComponent } from './components/poll/poll.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import { ChartComponent } from './components/chart/chart.component';
import { PollService } from './services/poll.service';
import { WinnerComponent } from './components/winner/winner.component';
import { IpollComponent } from './components/ipoll/ipoll.component';
import { HNChartComponent } from './components/hn-chart/hn-chart.component';
import { HnWinnerComponent } from './components/hn-winner/hn-winner.component';
import { ExportXlsxComponent } from './components/export-xlsx/export-xlsx.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PollComponent,
    ChartComponent,
    WinnerComponent,
    IpollComponent,
    HNChartComponent,
    HnWinnerComponent,
    ExportXlsxComponent,
    DialogComponent,
    TksDialogComponent
  ],
  entryComponents: [
    DialogComponent,
    TksDialogComponent
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
    MatInputModule,
    MatDialogModule,
    MatRadioModule
  ],
  providers: [PollService],
  bootstrap: [AppComponent]
})
export class AppModule { }

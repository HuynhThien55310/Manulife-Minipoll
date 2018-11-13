import { ExportXlsxComponent } from './components/export-xlsx/export-xlsx.component';
import { HnWinnerComponent } from './components/hn-winner/hn-winner.component';
import { HNChartComponent } from './components/hn-chart/hn-chart.component';
import { ChartComponent } from './components/chart/chart.component';
import { PollComponent } from './components/poll/poll.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WinnerComponent } from './components/winner/winner.component';
import { IpollComponent } from './components/ipoll/ipoll.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chart-HCM',
    component: ChartComponent
  },
  {
    path: 'winner-HCM',
    component: WinnerComponent
  },
  {
    path: 'poll-HCM',
    component: IpollComponent
  },
  {
    path: 'chart-HN',
    component: HNChartComponent
  },
  {
    path: 'winner-HN',
    component: HnWinnerComponent
  },
  {
    path: 'poll-HN',
    component: PollComponent
  },
  {
    path: 'export',
    component: ExportXlsxComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  { path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

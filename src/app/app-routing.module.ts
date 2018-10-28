import { ChartComponent } from './components/chart/chart.component';
import { PollComponent } from './components/poll/poll.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chart',
    component: ChartComponent
  },
  {
    path: 'poll',
    component: PollComponent
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

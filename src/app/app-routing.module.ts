import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from '../shared-components/ng-login/auth/auth-guard.service';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from '../shared-components/not-found/not-found.component';
import {ActivateAccountComponent} from './activate-account/activate-account.component';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {LoginSpecificComponent} from "./login/login-specific/login-specific.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {adminOrDoctorGuard} from "./admin-or-doctor.guard";
import {ForgotPasswordComponent} from "../shared-components/forgot-password/forgot-password.component";
import {
  ViewFullAssignmentComponent
} from "./view-full-assignment/view-full-assignment.component";
import {haveAssignmentGuard} from "./have-assignment.guard";
import {
  ResumeAssignmentComponent
} from "./resume-assignment/resume-assignment.component";

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'assignment/:id/review',
    canActivate: [haveAssignmentGuard, adminOrDoctorGuard],
    component: ResumeAssignmentComponent,

  },
  {
    path: 'assignment/:id',
    canActivate: [haveAssignmentGuard],
    component: ViewFullAssignmentComponent,

  },
  {
    path: 'dashboard',
    canActivate: [adminOrDoctorGuard, AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'login',
    children: [
      {
        path: 'doctor',
        component: LoginSpecificComponent,
      },
      {
        path: 'patient',
        component: LoginSpecificComponent,
      },
      {
        path: '**',
        component: LoginComponent,
      }

    ]
  },
  {
    path: 'forgot-password',
    children: [
      {
        path: 'reset',
        component: ForgotPasswordComponent,
      },
      {
        path:'',
        component: ForgotPasswordComponent,
      },
    ]
  },
  {
    path: 'activate',
    component: ActivateAccountComponent,
  },
  {
    path: 'register',
    component: ActivateAccountComponent,
  },
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

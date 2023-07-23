import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from '../shared-components/ng-login/auth/auth-guard.service';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ActivateAccountComponent} from './activate-account/activate-account.component';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {LoginSpecificComponent} from "./login/login-specific/login-specific.component";

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: 'doctor',
        component: LoginSpecificComponent,
      },
      {
        path: 'patient',
        component: LoginSpecificComponent,
      }

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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

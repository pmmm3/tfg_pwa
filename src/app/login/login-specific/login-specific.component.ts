import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-specific',
  templateUrl: './login-specific.component.html',
  styleUrls: ['./login-specific.component.scss']
})
export class LoginSpecificComponent {
  view: 'doctor' | 'patient';

  constructor(private router: Router) {
    this.view = router.url.split('/')[2] as 'doctor' | 'patient';
  }

  redirect() {
    const routeMap = {
      'doctor': '/dashboard',
      'patient': '/home'
    };

    const defaultRoute = '/home';
    const targetRoute = routeMap[this.view] || defaultRoute;

    this.router.navigate([targetRoute]).then();
  }
}


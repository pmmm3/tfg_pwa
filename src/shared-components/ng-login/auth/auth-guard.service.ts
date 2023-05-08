import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

/**
 * Guard to be used in routes definition, field 'canActivate'
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Constructor
   * @param auth
   * @param router
   */
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * Whether the current user can access to a view or not
   * @returns {boolean}
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    { url }: RouterStateSnapshot
  ): boolean {
    if (!this.auth.loggedIn()) {
      this.auth.redirectUrl = url;
      this.router.navigateByUrl('/login');
    }

    return true;
  }
}

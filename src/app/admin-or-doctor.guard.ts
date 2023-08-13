import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {UserService} from "../services/user.service";
import {inject} from "@angular/core";
import {forkJoin, Observable} from "rxjs";
import {map} from "rxjs/operators";

export const adminOrDoctorGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> => {
  const userService = inject(UserService);
  const router = inject(Router);

  return forkJoin([userService.isDoctor(), userService.isAdministrator()]).pipe(
    map((data) => {
      if (!data[0] && !data[1]) {
        return router.parseUrl('/home');
      }
      return true;
    })
  );
}

export const adminGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isAdministrator().pipe(
    map((data) => {
      if (!data) {
        return router.parseUrl('/home');
      }
      return true;
    }));
}


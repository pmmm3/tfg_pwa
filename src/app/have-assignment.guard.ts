import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router, UrlTree
} from "@angular/router";
import {inject} from "@angular/core";
import {PatientService} from "../services/patient.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export const haveAssignmentGuard: CanActivateFn = (next: ActivatedRouteSnapshot): boolean | Observable<boolean | UrlTree> => {
  const patientService = inject(PatientService);
  const router = inject(Router);

  const idAssignment = next.paramMap.get('id');

  return patientService.hasAssignment(idAssignment).pipe(map(data => {
    if (!data) {
      return router.parseUrl('/home');
    }
    return true;
  }));

}

import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {ActivateUser, User} from '../models/user';
import {forkJoin, Observable, of} from 'rxjs';
import {Deserialize, IJsonObject} from 'dcerialize';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * Api path
   */
  path = 'user';

  /**
   *
   * @param apiService
   * @param http
   */
  constructor(private apiService: ApiService, private http: HttpClient) {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  activateAccount(info: ActivateUser): Observable<User> {
    return this.http.post<IJsonObject>(this.path + '/activate', info).pipe(
      map((data) => Deserialize(data, () => User)),
      catchError((error) => {
        throw error;
      })
    );
  }

  isPatient(): Observable<boolean> {
    return this.http.get<boolean>(this.path + '/is-patient').pipe(
      map((data) => data),
      catchError((error) => {
        throw error;
      }));
  }

  isDoctor(): Observable<boolean> {
    return this.http.get<boolean>(this.path + '/is-doctor').pipe(
      catchError((error) => {
        console.error('Error in isDoctor:', error);
        return of(false);  // En caso de error, devuelve false
      })
    );
  }

  isAdministrator(): Observable<boolean> {
    return this.http.get<boolean>(this.path + '/is-admin').pipe(
      catchError((error) => {
        console.error('Error in isAdministrator:', error);
        return of(false);  // En caso de error, devuelve false
      })
    );
  }

  checkDoctorOrAdmin(): Observable<boolean> {
    return forkJoin([
      this.isDoctor(),
      this.isAdministrator()
    ]).pipe(
      map(([isDoctor, isAdministrator]) => isDoctor || isAdministrator)
    );
  }
}

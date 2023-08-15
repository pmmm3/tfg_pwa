import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {ActivateUser, User, UserList} from '../models/user';
import {EMPTY, forkJoin, Observable, of} from 'rxjs';
import {Deserialize, DeserializeJSON, IJsonObject, Serialize, SerializeArray} from 'dcerialize';
import {catchError, map} from 'rxjs/operators';
import {ListParams} from "../utils/table";

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
      catchError(() => {
        return EMPTY;
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

  list(params: ListParams = {}): Observable<UserList> {
    return this.http.post<IJsonObject>(this.path + '/list', Serialize(params, () => ListParams)).pipe(
      map((data) => Deserialize(data, () => UserList)),
      catchError(() => {
          return EMPTY;
        }
      )
    );
  }

  delete(email: string): Observable<string> {
    return this.http.delete<IJsonObject>(`${this.path}/${email}`).pipe(
      map(data => data['message'] as string || 'Error deleting user'),
      catchError(() => {
        return EMPTY;
      })
    );
  }

  register(data: { password: any; name: any; last_name: any }) {
    return this.http.post(this.path + '/request-activate', data).pipe(
      catchError(() => {
          return EMPTY;
        }
      ));

  }
}

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ActivateUser, User } from '../models/user';
import { Observable } from 'rxjs';
import { Deserialize, IJsonObject, Serialize } from 'dcerialize';
import { catchError, map } from 'rxjs/operators';

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
}

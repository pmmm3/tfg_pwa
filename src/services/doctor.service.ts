import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import { Observable} from "rxjs";
import {User} from "../models/user";
import {Deserialize, IJsonObject} from "dcerialize";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root',
})
export class DocService {
  /**
   * Api path
   */
  path = 'doctor';

  /**
   *
   * @param apiService
   * @param http
   */
  constructor(private apiService: ApiService, private http: HttpClient) {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  getPatients(id?: string): Observable<User[]> {
    return this.http.get<IJsonObject[]>(id ? `${this.path}/${id}/patients` : this.path).pipe(
      map((data) => data.map((user) => Deserialize(user, () => User)))
    );
  }
}

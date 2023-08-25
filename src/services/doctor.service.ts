import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {EMPTY, filter, Observable} from "rxjs";
import {Patient} from "../models/patient";
import {User} from "../models/user";


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
    return this.http.get<User[]>(id ? `${this.path}/${id}/patients` : this.path);
  }
}

import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Patient} from "../models/patient";
import {Deserialize, IJsonObject} from "dcerialize";
import {map} from "rxjs/operators";
import {Questionnaire} from "../models/questionnaire";


@Injectable({
  providedIn: 'root',
})
export class PatientService {
  /**
   * Api path
   */
  path = 'patient';

  /**
   *
   * @param apiService
   * @param http
   */
  constructor(private apiService: ApiService, private http: HttpClient) {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  getPatient(id?: string): Observable<Patient> {
    return this.http.get<IJsonObject>(id ? `${this.path}/${id}` : this.path).pipe(
      map((data: IJsonObject) => Deserialize(data, () => Patient))
    );
  }

  isConsentAccepted(): Observable<boolean> {
    return this.http.get<boolean>(`${this.path}/is-consent-accepted`);
  }

  acceptConsent(id: string, data: any): Observable<Patient> {
    return this.http.post<IJsonObject>(`${this.path}/${id}/accept-consent`, data).pipe(
      map((data: IJsonObject) => Deserialize(data, () => Patient))
    );
  }


  getAssignments(id: string): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(`${this.path}/${id}/questionnaires`);
  }

}


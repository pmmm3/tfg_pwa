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

  acceptConsent(id: string, data: any): Observable<Patient> {
    return this.http.post<IJsonObject>(`${this.path}/${id}/accept-consent`, data).pipe(
      map((data: IJsonObject) => Deserialize(data, () => Patient))
    );
  }


  getAssignments(id: string): Observable<Questionnaire[]> {
    return this.http.get<IJsonObject[]>(`${this.path}/${id}/questionnaires`).pipe(
      map(data => {
        return data.map(item => {
          const questionnaire = new Questionnaire();
          if (item && 'questionnaire' in item) {
            const questionnaireData = item['questionnaire'] as IJsonObject;
            questionnaire.id = Number(questionnaireData['id']);
            questionnaire.title = String(questionnaireData['title']);
            questionnaire.description = String(questionnaireData['description']);
            const createdAt = questionnaireData['created_at'];
            if (typeof createdAt === 'string' || createdAt instanceof Date) {
              questionnaire.createdAt = new Date(createdAt);
            }
            questionnaire.createdBy = String(questionnaireData['created_by']);
          }
          questionnaire.status = item['status'] as string || 'default';
          return questionnaire;
        });
      })
    );
  }

}


import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Observable, shareReplay} from "rxjs";
import {Patient} from "../models/patient";
import {
  Deserialize,
  DeserializeArray,
  IJsonArray,
  IJsonObject
} from "dcerialize";
import {map} from "rxjs/operators";
import {Assignment} from "../models/assignment";


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

  getBarona(id: string): Observable<number> {
    return this.http.get<number>(`${this.path}/${id}/ci-barona`).pipe();
  }

  acceptConsent(id: string, data: any): Observable<Patient> {
    return this.http.post<IJsonObject>(`${this.path}/${id}/accept-consent`, data).pipe(
      map((data: IJsonObject) => Deserialize(data, () => Patient))
    );
  }


  getAssignments(id: string): Observable<Assignment[]> {
    // If we have assigmments, we return them and get questionnaires from them
    return this.http.get<IJsonArray>(`${this.path}/${id}/assignments`).pipe(
      shareReplay(),
      map((data: IJsonArray) => DeserializeArray(data, () => Assignment)
      )
    );

  }

  hasConsent(): Observable<boolean> {
    return this.http.get<boolean>(`${this.path}/consent`).pipe();
  }

  hasAssignment(idAssignment: string | null) {
    return this.http.get<boolean>(`${this.path}/has-assignment/${idAssignment}`);
  }

  hasCiBarona(idPatient: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.path}/${idPatient}/has-ci-barona`);
  }

  sendBarona(id_patient: string, data: {
    age: any;
    education: any;
    zone: any;
    region: any;
    gender: any;
  }) {
    const input = {
      "age": data.age,
      "education_level": data.education,
      "zone": data.zone,
      "region": data.region,
      "gender": data.gender
    }
    return this.http.post(`${this.path}/${id_patient}/barona`, input);
  }
}


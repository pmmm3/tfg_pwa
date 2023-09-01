import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {Questionnaire} from "../models/questionnaire";
import {Observable, shareReplay} from "rxjs";
import {Assignment} from "../models/assignment";
import {Deserialize, IJsonObject} from "dcerialize";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  /**
   * Api path
   */
  path = 'assignment';

  /**
   *
   * @param apiService
   * @param http
   */
  constructor(private apiService: ApiService, private http: HttpClient) {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  createAssignment(questionnaire: Questionnaire, patientId: string, doctorId: string) {
    return this.http.post(this.path, {
      questionnaire_id: questionnaire.id,
      patient_id: patientId,
      doctor_id: doctorId
    }).pipe();
  }

  getAssignmentById(id: string): Observable<Assignment> {
    return this.http.get<IJsonObject>(this.path + '/' + id).pipe(
      shareReplay(),
      map((data) => Deserialize(data, () => Assignment))
    );
  }

  finishAssignment(id: number) {
    return this.http.put(this.path + '/' + id + '/finish', {}).pipe();
  }
}

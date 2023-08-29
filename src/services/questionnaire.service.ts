import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";
import {Questionnaire, QuestionnaireWithModule} from "../models/questionnaire";
import {DeserializeArray, IJsonArray} from "dcerialize";
import {map} from "rxjs/operators";
import {Module} from "../models/module";

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  /**
   * Api path
   */
  path = 'questionnaire';

  /**
   *
   * @param apiService
   * @param http
   */
  constructor(private apiService: ApiService, private http: HttpClient) {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  /**
   * Get all modules
   */
  getAll(): Observable<Questionnaire[]> {
    return this.http.get<IJsonArray>(this.path).pipe(
      map((data) => DeserializeArray(data, () => Questionnaire)
      ));
  }

  getQuestionnaire(id: number): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(this.path + `/${id}`).pipe(shareReplay());
  }

  getModules(questionnaire: Questionnaire) {
    return this.http.get<IJsonArray>(this.path + `/${questionnaire.id}/modules`).pipe(
      map((data) => DeserializeArray(data, () => Module)
      ));
  }

  createQuestionnaire(questionnaire: QuestionnaireWithModule) {
    return this.http.post(this.path, questionnaire).pipe();
  }
}

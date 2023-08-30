import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {QuestionOption} from "../models/question";
import {Deserialize, IJsonObject} from "dcerialize";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  /**
   * Api path
   */
  path = 'question';

  /**
   *
   * @param apiService
   * @param http
   */
  constructor(private apiService: ApiService, private http: HttpClient) {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  getQuestionOptions(id_question: number, id_module: number): Observable<QuestionOption> {
    return this.http.get<IJsonObject>(`${this.path}/${id_question}/${id_module}/type`).pipe(
      map((data) => Deserialize(data, () => QuestionOption))
    );
  }
}

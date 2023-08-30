import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {QuestionType} from "../app/question/question.component";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

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

  getQuestionType(id_question: number, id_module: number): Observable<QuestionType> {
    return this.http.get(`${this.path}/${id_question}/${id_module}/type`).pipe(
      map((data) => data as QuestionType)
    );
  }
}

import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Module} from "../models/module";
import {
  Deserialize,
  DeserializeArray,
  IJsonArray,
  IJsonObject
} from "dcerialize";
import {map} from "rxjs/operators";
import {Question} from "../models/question";

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  /**
   * Api path
   */
  path = 'module';

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
  getAll(): Observable<Module[]> {
    return this.http.get<Module[]>(this.path);
  }

  /**
   * Get module with questions
   */
  getModule(id: number): Observable<Module> {
    return this.http.get<IJsonObject>(`${this.path}/${id}`).pipe(
      map((data) => Deserialize(data, () => Module))
    );
  }

  getModuleQuestions(id: number): Observable<Question[]> {
    return this.http.get<IJsonArray>(`${this.path}/${id}/questions`).pipe(
      map((data) => DeserializeArray(data, () => Question))
    );

  }
}

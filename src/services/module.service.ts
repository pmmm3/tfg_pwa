import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Module} from "../models/module";

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
  getModuleWithQuestions(id: number): Observable<Module> {
    return this.http.get<Module>(`${this.path}/${id}/questions`);
  }
}

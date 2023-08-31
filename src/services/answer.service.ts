import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {Answer} from "../models/answer";
import {Deserialize, IJsonObject, Serialize} from "dcerialize";
import {map} from "rxjs/operators";
import {shareReplay} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AnswerService {
    /**
     * Api path
     */
    path = 'answer';

    /**
     *
     * @param apiService
     * @param http
     */
    constructor(private apiService: ApiService, private http: HttpClient) {
        this.path = this.apiService.getApiUrl() + this.path;
    }

    getAnswer(id_assignment: number, id_question: number, id_module: number) {
        return this.http.get<IJsonObject>(`${this.path}/${id_assignment}/${id_module}/${id_question}`).pipe(
            shareReplay(),
            map((data) => Deserialize(data, () => Answer))
        );
    }

    saveAnswer(answer: Answer) {
        return this.http.post<IJsonObject>(`${this.path}`, Serialize(answer, () => Answer));

    }
}

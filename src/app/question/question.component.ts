import {Component, Input} from '@angular/core';
import {Question} from "../../models/question";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question?: Question;
}

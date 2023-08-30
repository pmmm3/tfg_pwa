import {Component, Input, OnInit} from '@angular/core';
import {Question, QuestionType} from "../../models/question";
import {QuestionService} from "../../services/question.service";


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {
  @Input() question?: Question;
  options?: string[];
  type: QuestionType = QuestionType.Text;

  answer?: string;

  constructor(private questionService: QuestionService) {
    // nothing
  }

  ngOnInit() {
    if (this.question) {
      this.questionService.getQuestionOptions(this.question.id, this.question.idModule).subscribe((questionOption) => {
        if (questionOption) {
          this.type = questionOption.type;
          this.options = questionOption.options;
        }
      });
    }
  }

  protected readonly QuestionType = QuestionType;
}

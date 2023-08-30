import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../models/question";
import {QuestionService} from "../../services/question.service";

export enum QuestionType {
  YesNo = 'YesNo',
  Text = 'text',
  Multiple = 'multiple',
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {
  @Input() question?: Question;
  type: QuestionType = QuestionType.Text;

  constructor(private questionService: QuestionService) {
    // nothing
  }

  ngOnInit() {
    if (this.question) {
      this.questionService.getQuestionType(this.question.id, this.question.idModule).subscribe((type) => {
        if (type) {
          this.type = type;
        }
      });
    }
  }

  protected readonly QuestionType = QuestionType;
}

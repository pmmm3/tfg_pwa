import {Component, Input, OnInit} from '@angular/core';
import {Option, Question, QuestionType} from "../../models/question";
import {QuestionService} from "../../services/question.service";
import {Assignment} from "../../models/assignment";
import {Answer} from "../../models/answer";
import {AnswerService} from "../../services/answer.service";


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {
  @Input() question?: Question;
  @Input() assignment?: Assignment;
  options?: Option[];
  type: QuestionType = QuestionType.Text;

  answer?: string | number;

  constructor(private questionService: QuestionService, private answerService: AnswerService) {
    // nothing
  }

  ngOnInit() {
    if (this.question) {
      this.questionService.getQuestionOptions(this.question.id, this.question.idModule).subscribe((questionOption) => {
        if (questionOption) {
          this.type = questionOption.type;
          this.options = questionOption.options;

          // Get the answer from the assignment if it exists
          if (this.assignment) {
            this.answerService.getAnswer(this.assignment.id!, this.question!.id, this.question!.idModule).subscribe((answer: Answer) => {
              if (answer) {
                if (this.type === QuestionType.Text) {
                  this.answer = answer.openAnswer;
                } else {
                  this.answer = answer.idOption;
                }
              }
            });
          }
        }
      });
    }
  }

  protected readonly QuestionType = QuestionType;

  onAnswerChange() {
    if (this.question && this.assignment) {
      const answer = new Answer(this.assignment.id!, this.question.id, this.question.idModule);
      if (this.type === QuestionType.Text) {
        answer.openAnswer = this.answer as string;
      } else {
        answer.idOption = this.answer ? this.answer as number : undefined;
      }
      this.answerService.saveAnswer(answer).subscribe();
    }
  }
}

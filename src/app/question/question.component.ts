import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../models/question";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit{
  @Input() question?: Question;

  constructor() {
    // nothing
  }
  ngOnInit() {
    console.log(this.question)
  }
}

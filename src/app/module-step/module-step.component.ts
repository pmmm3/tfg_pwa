import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {Module} from "../../models/module";
import {Question} from "../../models/question";
import {ModuleService} from "../../services/module.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-module-step',
  templateUrl: './module-step.component.html',
  styleUrls: ['./module-step.component.scss']
})
export class ModuleStepComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;
  @Input() module?: Module;

  questions: Question[] = [];
  displayedQuestions: Question[] = [];

  pageSize = 1;
  pageIndex = 0;

  constructor(private moduleService: ModuleService) {
  }

  ngOnInit() {
    if (this.module) {
      this.moduleService.getModuleQuestions(this.module!.id!).subscribe((data) => {
        this.questions = data;
        this.updateDisplayedQuestions();
      });
    }
  }

  ngAfterViewInit() {
    this.paginator!.page.subscribe((event) => {
      this.pageIndex = event.pageIndex;
      this.updateDisplayedQuestions();
    });
  }

  updateDisplayedQuestions(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedQuestions = this.questions.slice(startIndex, endIndex);
  }
}

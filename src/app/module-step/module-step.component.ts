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
import {Assignment} from "../../models/assignment";
import {AssignmentService} from "../../services/assignment.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-module-step',
  templateUrl: './module-step.component.html',
  styleUrls: ['./module-step.component.scss']
})
export class ModuleStepComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;
  @Input() module?: Module;
  @Input() assignment?: Assignment;
  @Input() isLastModule?: boolean;

  questions: Question[] = [];
  displayedQuestions: Question[] = [];
  // Page size for mobile devices is 1, for desktop devices are 3
  pageSize = window.innerWidth < 600 ? 1 : 3;
  pageIndex = 0;

  constructor(private moduleService: ModuleService, private assignmentService: AssignmentService, private snackBar: MatSnackBar, private router: Router) {
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
    this.paginator!.page.subscribe(() => {
      this.pageIndex = this.paginator!.pageIndex;
      this.updateDisplayedQuestions();
    });

  }

  updateDisplayedQuestions(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedQuestions = this.questions.slice(startIndex, endIndex);
  }

  finishAssignment() {
    this.assignmentService.finishAssignment(this.assignment!.id!).subscribe(
      (data) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        this.snackBar.open(error.error.detail, 'Cerrar');
      });
  }
}

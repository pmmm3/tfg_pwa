import {Component} from '@angular/core';
import {Questionnaire} from "../../models/questionnaire";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {QuestionnaireService} from "../../services/questionnaire.service";
import {Module} from "../../models/module";
import {getStorageObject} from "../../utils/storage-manager";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  AssignmentModalComponent
} from "../assignment-modal/assignment-modal.component";

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QuestionnaireListComponent {
  dataNoFilter: Questionnaire[] = [];
  dataSource: Questionnaire[] = [];
  columnsToDisplay = ['title', 'createdAt'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'createdBy', 'actions', 'expand'];
  expandedElement?: Questionnaire;
  moduleExpandedElement?: Module[];
  filtered = false;

  constructor(private questionnaireService: QuestionnaireService, public dialog: MatDialog) {
    this.questionnaireService.getAll().subscribe((data) => {
      this.dataSource = data;
      this.dataNoFilter = data;
    });
  }

  getModules(questionnaire: Questionnaire) {
    this.questionnaireService.getModules(questionnaire).subscribe((data) => {
      this.moduleExpandedElement = data;
    });
  }

  filterByMine() {
    this.filtered = !this.filtered;
    if (!this.filtered) {
      this.dataSource = this.dataNoFilter;
      return;
    }
    this.dataSource = this.dataSource.filter((questionnaire) => questionnaire.createdBy === getStorageObject('email'));
  }

  assignQuestionnaire(questionnaire: Questionnaire) {
    const ref = this.dialog.open(AssignmentModalComponent);
    const instance = ref.componentInstance;
    instance.questionnaire = questionnaire;
  }


}

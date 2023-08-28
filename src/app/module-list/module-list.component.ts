import {Component} from '@angular/core';
import {ModuleService} from "../../services/module.service";
import {Module} from "../../models/module";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {QuestionnaireModalComponent} from "../questionnaire-modal/questionnaire-modal.component";

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent {
  displayedColumns: string[] = ['select','title'];
  dataSource = new MatTableDataSource<Module>([]);
  selection = new SelectionModel<Module>(true, []);

  constructor(private moduleService: ModuleService, public dialog: MatDialog) {
    this.moduleService.getAll().subscribe((modules) => {
      this.dataSource.data = modules;
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Module): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  createQuestionnaire() {

    const ref = this.dialog.open(QuestionnaireModalComponent, {
      height: 'fit-content',
    });
    const instance = ref.componentInstance;
    instance.modules = this.selection.selected;
  }
}

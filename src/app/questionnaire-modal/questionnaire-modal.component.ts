import {Component, Input} from '@angular/core';
import {Module} from "../../models/module";
import {QuestionnaireService} from "../../services/questionnaire.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {QuestionnaireWithModule} from "../../models/questionnaire";
import {getStorageObject} from "../../utils/storage-manager";
import {MatDialog} from "@angular/material/dialog";
import {CustomSnackbarService} from "../../services/custom-snackbar.service";

@Component({
  selector: 'app-questionnaire-modal',
  templateUrl: './questionnaire-modal.component.html',
  styleUrls: ['./questionnaire-modal.component.scss']
})
export class QuestionnaireModalComponent {
  @Input() modules: Module[] = [];

  formQuestionnaire: FormGroup;

  constructor(private questionnaireService: QuestionnaireService, private _formBuilder: FormBuilder, private dialog: MatDialog, private snackBarService: CustomSnackbarService) {
    this.formQuestionnaire = this._formBuilder.group({
        title: [''],
        description: ['']
      },
    );

  }

  submitQuestionnaire() {

    if (this.formQuestionnaire.valid) {
      const data = new QuestionnaireWithModule(
        this.formQuestionnaire.value.title, new Date(),
        this.formQuestionnaire.value.description, getStorageObject('email'),
        this.modules
      );
      this.questionnaireService.createQuestionnaire(data).subscribe(
        () => {
          this.snackBarService.present('Cuestionario creado', 'OK');
          if (this.dialog.openDialogs.length > 0) {
            this.dialog.closeAll();
          }
        }
      )
    }
  }

}

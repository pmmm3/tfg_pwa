import {Component, Input} from '@angular/core';
import {Questionnaire} from "../../models/questionnaire";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AssignmentService} from "../../services/assignment.service";
import {getStorageObject} from "../../utils/storage-manager";
import {MatDialogRef} from "@angular/material/dialog";
import {CustomSnackbarService} from "../../services/custom-snackbar.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-assignment-modal',
  templateUrl: './assignment-modal.component.html',
  styleUrls: ['./assignment-modal.component.scss']
})
export class AssignmentModalComponent {
  @Input() questionnaire: Questionnaire | undefined = undefined;
  formQuestionnaire: FormGroup;
  isAdministrator = false;

  constructor(private formBuilder: FormBuilder,
    private assignmentService: AssignmentService,
    public dialogRef: MatDialogRef<AssignmentModalComponent>,
    private snackBarService: CustomSnackbarService,
    private userService: UserService) {


    this.formQuestionnaire = formBuilder.group({
      patientEmail: ['', [Validators.required, Validators.email]],
      doctorEmail: ['', [Validators.required, Validators.email]],

    });
    // Get doctor email from storage
    this.userService.isAdministrator()
      .subscribe((isAdministrator) => {
        this.isAdministrator = isAdministrator;
      });
    // Disable doctor email if the user is not an administrator
    if (!this.isAdministrator) {
      this.formQuestionnaire.controls['doctorEmail'].disable();
    }
    this.formQuestionnaire.controls['doctorEmail'].setValue(getStorageObject('email'));


  }

  assignQuestionnaire() {
    if (this.formQuestionnaire.valid) {
      if (this.questionnaire === undefined) {
        return;
      }
      this.assignmentService.createAssignment(this.questionnaire,
        this.formQuestionnaire.value.patientEmail,
        this.formQuestionnaire.getRawValue().doctorEmail).subscribe(
        () => {
          this.dialogRef.close();
          this.snackBarService.present('Cuestionario asignado', 'OK');
        },
        (e) => {
          this.snackBarService.present(e.error.detail, 'OK');
        }
      );
    }

  }
}

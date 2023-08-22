import {Component} from '@angular/core';
import {StepperOrientation} from "@angular/cdk/stepper";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {PatientService} from "../../services/patient.service";
import {getStorageObject} from "../../utils/storage-manager";
import {CustomSnackbarService} from "../../services/custom-snackbar.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-consentimiento',
  templateUrl: './modal-consentimiento.component.html',
  styleUrls: ['./modal-consentimiento.component.scss']
})
export class ModalConsentimientoComponent {
  stepperOrientation: Observable<StepperOrientation>;
  checked = false;
  formConsentimiento: FormGroup;

  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog, private snackBarService: CustomSnackbarService, breakpointObserver: BreakpointObserver, private patientService: PatientService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 300px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    this.formConsentimiento = this._formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      dni: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    });

  }

  submitConsentimiento() {
    if (this.formConsentimiento.valid) {
      this.patientService.acceptConsent(getStorageObject('email'), this.formConsentimiento.value).subscribe(
        () => {
          this.snackBarService.present('Consentimiento aceptado', 'OK');
          this.dialog.closeAll();

        }
      )
    }

  }
}

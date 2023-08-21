import {Component} from '@angular/core';
import {StepperOrientation} from "@angular/cdk/stepper";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-modal-consentimiento',
  templateUrl: './modal-consentimiento.component.html',
  styleUrls: ['./modal-consentimiento.component.scss']
})
export class ModalConsentimientoComponent {
  stepperOrientation: Observable<StepperOrientation>;
  checked = false;
  formConsentimiento: FormGroup;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 300px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
    this.formConsentimiento = this._formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      dni: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    });
  }

  submitConsentimiento() {
    if (this.formConsentimiento.valid) {
      console.log(this.formConsentimiento.value);
    }

  }
}

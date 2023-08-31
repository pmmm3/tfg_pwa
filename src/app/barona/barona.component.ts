import {Component} from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getStorageObject} from "../../utils/storage-manager";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-barona',
  templateUrl: './barona.component.html',
  styleUrls: ['./barona.component.scss']
})
export class BaronaComponent {
  baronaForm: FormGroup;

  genderOptions = [
    {value: 1, text: 'Hombre'},
    {value: 2, text: 'Mujer'}
  ];

  educationOptions = [
    {value: 1, text: 'Anaflabeto'},
    {value: 2, text: 'Sabe leer y escribir, pero no tiene estudios formales'},
    {value: 3, text: 'Primaria (8EGB/ESO/FP1)'},
    {value: 4, text: 'Secundaria (Bachillero/COU/FP2)'},
    {value: 5, text: 'Diplomado / Licenciado / Doctorado'},
    {value: 0, text: 'Otros'}
  ];

  regionOptions = [
    {value: 1, text: 'Norte '},
    {value: 2, text: 'Centro '},
    {value: 3, text: 'Este '},
    {value: 4, text: 'Sur'}
  ];

  zoneOptions = [
    {value: 1, text: 'Urbana (>50.000 habs.)'},
    {value: 2, text: 'Intermedia (10.000 a 49.999 habs)'},
    {value: 3, text: 'Rural (<9.999 habs)'}
  ];


  constructor(public snackBar: MatSnackBar, private patientService: PatientService, private fb: FormBuilder, private dialog: MatDialog) {
    this.baronaForm = this.fb.group({
      age: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      region: ['', Validators.required],
      zone: ['', Validators.required],
    });
  }

  send() {
    if (this.baronaForm.valid) {
      this.patientService.sendBarona(getStorageObject('email'), this.baronaForm.value).subscribe(() => {
        this.snackBar.open('Enviado correctamente', 'OK', {
          duration: 2000,
        });
        this.dialog.closeAll();
      });
    }
  }
}





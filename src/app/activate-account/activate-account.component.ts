import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { UserService } from '../../services/user.service';
import {MatDialog} from "@angular/material/dialog";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

interface DecodedToken {
  email: string;
  // other properties, if any
}

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
})
export class ActivateAccountComponent implements OnInit {
  form: FormGroup;
  showPassword = false;
  token = '';
  isRegistering = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      name: [''],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitActivate() {
    // Get the token from the url and decode it
    if (this.form.valid) {
      const data = {
        token: this.token,
        password: this.form.get('password')?.value,
        name: this.form.get('name')?.value,
        last_name: this.form.get('lastname')?.value,
      };
      this.userService.activateAccount(data).subscribe(
        (_) => {
          this._snackBar.open('Cuenta activada con éxito', 'OK');
          this.router.navigate(['login']);
        },
        (error) => {
          this._snackBar.open('Error al activar la cuenta', 'OK');
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
  submitRegister() {
    console.log(this.form.value);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(field: string) {
    const formField = this.form.get(field);
    return formField?.invalid;
  }

  ngOnInit(): void {
    this.token = this.router.parseUrl(this.router.url).queryParams['token'];
    if (!this.token && this.router.url.includes('register')) {
      this.isRegistering = true;
      this.form.get('email')?.enable();
      this.dialog.open(InfoDialogComponent, {
        data: {
          title: 'Registro válido solo para doctores y administradores.',
          message: 'Lamentamos informarte que actualmente solo aceptamos registros de usuarios con roles de doctor y administrador. Si cumples con alguno de estos roles, puedes proceder con el registro.\n' +
            '\n' +
            'Sin embargo, ten en cuenta que todos los registros de nuevos usuarios requerirán la aprobación de otro administrador antes de poder acceder a la aplicación. Una vez que hayas completado el registro, tu solicitud será revisada y procesada lo antes posible.\n' +
            '\n' +
            'Gracias por tu paciencia y comprensión. Si tienes alguna pregunta adicional, no dudes en contactar al administrador del sistema para obtener más información.',
          okText: 'OK',
          cancelText: null,
        }
      })
    }
    else {
      // Set email value on form and disable it
      // Decode the token and cast the result to the DecodedToken interface
      const decodedToken = jwt_decode(this.token) as DecodedToken;

      // Set email value on form and disable it
      this.form.get('email')!.setValue(decodedToken.email);
      this.form.get('email')?.disable();
    }
  }
}

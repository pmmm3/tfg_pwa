import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmPasswordValidator} from "../../utils/custom-validators";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  emailForm: FormGroup | undefined = undefined;
  passwordForm: FormGroup | undefined = undefined;
  token: string | undefined = undefined;

  constructor(private activatedRouter: ActivatedRoute,private router: Router,private snackBar: MatSnackBar, private userService: UserService) {
    // Get from url the token if exists
    this.activatedRouter.params.subscribe(params => {
      this.token = this.activatedRouter.snapshot.queryParamMap.get('token') ?? undefined;
      if (this.token === undefined) {
        this.emailForm = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
        });
      }
      else
      {
       this.passwordForm = new FormGroup({
          password: new FormControl('', Validators.required),
          repeatPassword: new FormControl('', Validators.required),
       }, {validators: ConfirmPasswordValidator()});
      }
    });


  }

  sendForgotPassword() {
    if (this.emailForm!.valid) {
      this.userService.forgotPassword(this.emailForm!.value).subscribe(() => {
        this.snackBar.open('Correo enviado', 'OK', {duration: 3000});
        this.router.navigate(['/login']);
      });
    }
  }


  changePassword() {
    if (this.passwordForm!.valid) {
      this.userService.changePassword(this.passwordForm!.value.password,this.token!).subscribe(() => {
        this.snackBar.open('Contraseña cambiada', 'OK', {duration: 3000});
        this.router.navigate(['/login']);
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { UserService } from '../../services/user.service';

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
    private userService: UserService
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
      this.userService.activateAccount(data).subscribe();
    } else {
      this.form.markAllAsTouched();
    }
  }
  submitRegister() {
  // Todo
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

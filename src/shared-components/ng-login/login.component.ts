import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { skip } from 'rxjs/operators';

/**
 * Selector, template-form and styles for login component
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ng-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  /**
   * Login form
   */
  public loginForm: FormGroup;

  /**
   * Event emitter that will trigger an event when the login  is correct.
   */
  @Output() logged: EventEmitter<string | null> = new EventEmitter();

  /**
   * Component constructor
   */
  constructor(private authService: AuthService, public snackBar: MatSnackBar) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  /**
   * Creates the login form fields and their validations
   */
  ngOnInit(): void {
    // If already logged go home
    if (this.authService.loggedIn()) {
      this.logged.emit(null);
    }
  }

  /**
   * Method called on the event 'onSubmit', if an access_token is received then navigates to home otherwise shows
   * the error
   */
  public login(): void {
    this.authService
      .login(this.loginForm.value)
      .pipe(skip(1)) // initialization
      .subscribe((accessToken) => {
        if (accessToken) {
          if (accessToken === 'true') {
            this.snackBar.open(
              'The account is locked, an admin has to accept your account. Try again later.',
              '',
              {
                duration: 3000,
              }
            );
          } else {
            this.logged.emit(this.authService.redirectUrl);
            this.authService.redirectUrl = null;
          }
        } else {
          this.snackBar.open('Credenciales incorrectas', '', {
            duration: 3000,
          });
        }
      });
  }
}

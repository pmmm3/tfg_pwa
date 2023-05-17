import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { AuthService } from './auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomSnackbarService } from '../../services/custom-snackbar.service';
import { JwtModule } from './jwt/jwt.module';
import { LoginComponent } from './login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { getStorageObject } from '../../utils/storage-manager';
import { FlexModule } from '@angular/flex-layout';

/**
 * TODO: this module is included here because of some Angular changes that broke the original ng-login component.
 * Revisit and fix in the future.
 **/

/**
 * Method to get the access token from the local storage
 */
export function getAccessToken(): any {
  return getStorageObject('access_token');
}

/**
 * Method to get the domains from the environment
 */
export function getDomains(): (string | RegExp)[] {
  let baseDomain = environment.apiDomain;
  if (environment.apiPort) {
    baseDomain += ':' + environment.apiPort;
  }

  return [new RegExp('.*.?' + baseDomain)];
}

/**
 * Authentication service factory
 */
export function authServiceFactory(
  httpClient: HttpClient,
  apiService: ApiService,
  snackBarService: CustomSnackbarService
): AuthService {
  return new AuthService(httpClient, apiService, snackBarService);
}

/**
 * NG-Login module
 */
@NgModule({
  declarations: [LoginComponent],
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        domainsGetter: getDomains,
        tokenGetter: getAccessToken,
      },
    }),
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    RouterModule,
    TranslateModule,
    FlexModule,
  ],
  exports: [LoginComponent, MatFormFieldModule],
  providers: [
    {
      provide: AuthService,
      useFactory: authServiceFactory,
      deps: [HttpClient, ApiService, CustomSnackbarService],
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'always',
      } as MatFormFieldDefaultOptions,
    },
  ],
})

/**
 * Login module class
 */
export class LoginModule {}

import { AuthService } from './auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from './jwt/jwt.module';
import { LoginComponent } from './login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { getStorageObject } from '../../utils/storage-manager';
import { of } from 'rxjs';
import { waitForAsync } from '@angular/core/testing';

let environment: {
  domain: '';
  apiUrl: '';
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  //let spy;
  beforeEach(waitForAsync(() => {
    const httpClient = jasmine.createSpyObj('HttpClient', {
      post: of({}),
      get: of({})
    });
    const apiService = jasmine.createSpyObj('ApiService', {
      post: of({}),
      get: of({})
    });
    const snackBar = jasmine.createSpyObj('customSnackBar', {
      post: of({}),
      get: of({})
    });
    authService = new AuthService(httpClient, apiService, snackBar);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return getStorageObject('access_token');
            },
            domainsGetter: () => {
              return [environment.domain];
            }
          }
        }),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        MatCheckboxModule,
        TranslateModule.forRoot()
      ],
      providers: [{ provide: AuthService, useValue: authService }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();

    const username = component.loginForm.controls['email'];
    expect(username.valid).toBeFalsy();
    username.setValue('admin@admin');
    expect(username.valid).toBeTruthy();

    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    password.setValue('1234');
    expect(password.valid).toBeTruthy();

    expect(component.loginForm.valid).toBeTruthy();
  });
});

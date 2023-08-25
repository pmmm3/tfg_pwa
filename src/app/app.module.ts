import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LoginComponent} from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {LoginModule} from '../shared-components/ng-login/login.module';
import {createTranslateLoader} from '../utils/translate';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from '../shared-components/not-found/not-found.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {AuthGuard} from '../shared-components/ng-login/auth/auth-guard.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgOptimizedImage} from '@angular/common';
import {NavBarComponent} from '../shared-components/nav-bar/nav-bar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MAT_DATE_LOCALE, MatRippleModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {ActivateAccountComponent} from './activate-account/activate-account.component';
import {InfoDialogComponent} from './info-dialog/info-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {LandingPageComponent} from './landing-page/landing-page.component';
import {RouterLink} from "@angular/router";
import {LoginSpecificComponent} from './login/login-specific/login-specific.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ForgotPasswordComponent} from '../shared-components/forgot-password/forgot-password.component';
import {ConsentimientoComponent} from './modal-consentimiento/consentimiento-texto/consentimiento.component';
import {ModalConsentimientoComponent} from './modal-consentimiento/modal-consentimiento.component';
import {MatStepperModule} from "@angular/material/stepper";
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    NavBarComponent,
    ActivateAccountComponent,
    InfoDialogComponent,
    LandingPageComponent,
    LoginSpecificComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ConsentimientoComponent,
    ModalConsentimientoComponent,
    QuestionnaireComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'es',
    }),
    LoginModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    NgOptimizedImage,
    MatMenuModule,
    MatRippleModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatStepperModule,
    FormsModule,
    MatChipsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [AuthGuard,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}],
  bootstrap: [AppComponent],
})
export class AppModule {
}

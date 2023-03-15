import { BehaviorSubject, Subject } from 'rxjs';
import { Deserialize, IJsonObject, autoserializeAs } from 'dcerialize';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { getStorageObject, removeStorageObject, setStorageObject } from '../../../utils/storage-manager';
import { ApiService } from 'src/services/api.service';
import { CredentialsInterface } from '../../../interfaces/user.interface';
import { CustomSnackbarService } from '../../../services/custom-snackbar.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

/**
 * Login response structure
 */
export class LoginResponse {
  /**
   * If the login was successful or not
   */
  @autoserializeAs(() => Boolean, 'login_ok') loginOk: boolean | undefined;

  /**
   * Login access token
   */
  @autoserializeAs(() => String, 'access_token') accessToken: string | undefined;

  /**
   * If the user is blocked or not
   */
  @autoserializeAs(() => Boolean, 'blocked') blocked: boolean | undefined;
}

/**
 * Authentication service using JWT
 */
@Injectable()
export class AuthService {
  /**
   * The Observable with accessToken
   */
  private readonly accessToken: BehaviorSubject<string>;

  /**
   * The Observable signaling that the user has logged out
   */
  public userLoggedOut: Subject<boolean> = new Subject<boolean>();

  /**
   * Url to redirect after login
   */
  public redirectUrl: string | null = null;

  /**
   * Constructor
   */
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private snackBarService: CustomSnackbarService
  ) {
    this.accessToken = new BehaviorSubject(String());
    this.apiService = new ApiService();
  }

  /**
   * This method stores the accessToken retrieved from the backend in the local storage
   * @param credentials - An object with the keys 'username' and 'password'
   * @returns The data object with the accessToken or an error
   */
  public login(credentials: CredentialsInterface): Observable<string> {
    this.http
      .post<IJsonObject>(this.apiService.getApiUrl() + 'auth/login', credentials)
      .pipe(
        map((response) => Deserialize(response, () => LoginResponse)),
        catchError((err: HttpErrorResponse) => this.snackBarService.showError(err))
      )
      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an accessToken key
        (data) => {
          if (data.loginOk && data.accessToken) {
            const storage = credentials.remember ? 'local' : 'session';
            setStorageObject('remember', { value: credentials.remember }, credentials.remember ? 'local' : 'session');
            setStorageObject('access_token', data.accessToken, storage);
            this.accessToken.next(data.accessToken.toString());
          } else if (data.blocked === true) {
            this.accessToken.next(data.blocked.toString());
          } else {
            this.accessToken.next('');
          }
        },
        (_error) => {
          // eslint-disable-next-line no-console
          console.log('Error en login :', _error);
          this.accessToken.next('');
        }
      );

    return this.accessToken;
  }

  /**
   * Whether the user has a valid token or not
   */
  public loggedIn(): boolean {
    return !!getStorageObject('access_token');
  }

  /**
   * Remove the token from local storage and redirects the user to login page
   */
  public logout(): void {
    removeStorageObject('access_token');
    removeStorageObject('remember');
    this.userLoggedOut.next(true);
  }
}

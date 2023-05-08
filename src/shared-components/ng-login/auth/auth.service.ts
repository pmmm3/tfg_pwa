import { BehaviorSubject, Subject } from 'rxjs';
import { Deserialize, IJsonObject, autoserializeAs } from 'dcerialize';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {
  getStorageObject,
  removeStorageObject,
  setStorageObject,
} from '../../../utils/storage-manager';
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
   * Login access token
   */
  @autoserializeAs(() => String, 'access_token') accessToken:
    | string
    | undefined;
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
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    this.http
      .post<IJsonObject>(this.apiService.getApiUrl() + 'auth/token', formData)
      .pipe(
        map((response) => Deserialize(response, () => LoginResponse)),
        catchError((err: HttpErrorResponse) =>
          this.snackBarService.showError(err)
        )
      )
      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an accessToken key
        (data) => {
          if (data.accessToken) {
            const storage = 'session';
            setStorageObject('access_token', data.accessToken, storage);
            this.accessToken.next(data.accessToken.toString());
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
    this.userLoggedOut.next(true);
  }
}

import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { JWT_OPTIONS } from './jwt-options.token';
import { JwtHelperService } from './jwt-helper.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * JWT interceptor
 *
 * This class intercepts HTTP calls to append the JWT token. Also manages the token refresh.
 */
export class JwtInterceptor implements HttpInterceptor {
  /**
   * Token getter method
   */
  tokenGetter: () => string | Promise<string>;

  /**
   * Whitelisted domains getter method
   */
  domainsGetter: () => (string | RegExp)[];

  /**
   * JWT header name
   */
  headerName: string;

  /**
   * JWT authentication scheme (e.g. Bearer)
   */
  authScheme: string;

  /**
   * Whether to throw a no token error or not
   */
  throwNoTokenError: boolean;

  /**
   * Whether to skip the call when token is expired
   */
  skipWhenExpired: boolean;

  /**
   * Constructor. Here main configuration options are set
   */
  constructor(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Inject(JWT_OPTIONS) config: any,
    public jwtHelper: JwtHelperService,
    private inj: Injector,
    private router: Router,
    private authService: AuthService
  ) {
    this.tokenGetter = config.tokenGetter;
    this.domainsGetter = config.domainsGetter;
    this.headerName = config.headerName || 'Authorization';
    this.authScheme = config.authScheme || config.authScheme === '' ? config.authScheme : 'Bearer ';
    this.throwNoTokenError = config.throwNoTokenError || false;
    this.skipWhenExpired = config.skipWhenExpired;
  }

  /**
   * Whitelisted domains checker
   * @param {HttpRequest<any>} request Request to analyze
   * @return {boolean} If the domain of the request is whitelisted or not
   */
  isWhitelistedDomain(request: HttpRequest<any>): boolean {
    if (!request.url.startsWith('/')) {
      const requestUrl = new URL(request.url);
      const whitelistedDomains = this.domainsGetter();

      return (
        whitelistedDomains.findIndex((domain) =>
          typeof domain === 'string' ? domain === requestUrl.host : domain.test(requestUrl.host)
        ) > -1
      );
    } else {
      return true;
    }
  }

  /**
   * Request interceptor. This method will intercept any HTTP call, append the JWT header (if whitelisted) and
   * handle the token refresh, if necessary.
   * @param request Intercepted request
   * @param next HTTP request handler
   * @return Request results as an observable
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Get the current token
    const token: any = this.tokenGetter();

    // Add the token to the request for whitelisted domains
    if (this.isWhitelistedDomain(request)) {
      request = this.addToken(request, token);
    }
    request = this.addDomain(request);

    // We should get the AuthService like this to avoid circular dependencies
    this.authService = this.inj.get(AuthService);

    // Handle the request
    return next.handle(request).pipe(
      catchError((error) => {
        // If the token is expired...
        if (error.status === 401) {
          // If session is expired, logout and redirect to login
          this.authService.logout();
          this.router.navigateByUrl('/login?exp=1');
        }

        return observableThrowError(error);
      })
    );
  }

  /**
   * Token appender method
   * @param request Request to append the token to
   * @param token JWT Token
   */
  private addToken(request: HttpRequest<any>, token: string) {
    if (token) {
      return request.clone({
        setHeaders: {
          [this.headerName]: `${this.authScheme}${token}`
        }
      });
    } else {
      return request.clone();
    }
  }

  /**
   * Domain appender method
   * @param request Request to append the domain to
   */
  private addDomain(request: HttpRequest<any>) {
    const domain = document.location.hostname.split('.');

    return request.clone({
      setHeaders: {
        ['domain']: domain[0]
      }
    });
  }
}

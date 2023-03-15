import { Inject, ModuleWithProviders } from '@angular/core';
import { NgModule, Optional, Provider, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWT_OPTIONS } from './jwt-options.token';
import { JwtHelperService } from './jwt-helper.service';
import { JwtInterceptor } from './jwt.interceptor';

export * from './jwt.interceptor';
export * from './jwt-helper.service';
export * from './jwt-options.token';

/**
 * JWT module options
 */
export interface JwtModuleOptions {
  /**
   * JWT options provider
   */
  jwtOptionsProvider?: Provider;

  /**
   * JWT configuration
   */
  config?: {
    tokenGetter?: () => string | Promise<string>;
    domainsGetter?: () => (string | RegExp)[];
    headerName?: string;
    authScheme?: string;
    throwNoTokenError?: boolean;
    skipWhenExpired?: boolean;
  };
}

/**
 * JWT Module
 */
@NgModule()
export class JwtModule {
  /**
   * Constructor
   */
  constructor(@Inject('PARENT_MODULE') @Optional() @SkipSelf() parentModule: JwtModule) {
    if (parentModule) {
      throw new Error("JwtModule is already loaded. It should only be imported in your application's main module.");
    }
  }

  /**
   * For root method for module
   * @param options Configuration options
   * @return Module with providers appended to it
   */
  static forRoot(options: JwtModuleOptions): ModuleWithProviders<JwtModule> {
    return {
      ngModule: JwtModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
        },
        options.jwtOptionsProvider || {
          provide: JWT_OPTIONS,
          useValue: options.config
        },
        JwtHelperService
      ]
    };
  }
}

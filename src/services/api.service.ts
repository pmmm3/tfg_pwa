import { EnvironmentInterface } from 'src/interfaces/environment.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * Constructor
   * @param {any} environment Environment config
   */
  private environment: EnvironmentInterface;

  constructor() {
    this.environment = environment;
  }

  public getApiUrl(withPath = true): string {
    let url = `${this.environment.apiProtocol}://${this.environment.apiDomain}`;

    if (this.environment.apiPort) {
      url += `:${this.environment.apiPort}`;
    }

    if (withPath) {
      url += `/${this.environment.apiPath}`;
    }

    return url;
  }
}

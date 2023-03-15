/**
 * Interface that represents an environment variable
 */
export interface EnvironmentInterface {
  production: boolean;
  frontendDomain: string;
  apiDomain: string;
  apiProtocol: string;
  apiPort?: number;
  apiPath: string;
}

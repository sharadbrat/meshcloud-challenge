import { injectable } from 'inversify';


export interface FrontendConfig {
  apiGateway: string;
  apiToken: string;
  rootUrl: string;
}


@injectable()
export abstract class ConfigService {

  public abstract get frontendConfig(): FrontendConfig;

}

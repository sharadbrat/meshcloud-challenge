import { injectable } from 'inversify';

import { ConfigService, FrontendConfig } from '@/core/service/config/config.service';


/**
 * @class ConfigServiceEnvImpl
 * @public
 */
@injectable()
export class ConfigServiceEnvImpl extends ConfigService {

  public get frontendConfig(): FrontendConfig {
    return this.frontendConfigInternal;
  }


  /**
   * @property {FrontendConfig} frontendConfigInternal
   * @private
   */
  private readonly frontendConfigInternal: FrontendConfig = Object.freeze({
    apiGateway: process.env.VUE_APP_API_GATEWAY,
    apiToken: process.env.VUE_APP_API_TOKEN,
    rootUrl: process.env.VUE_APP_ROOT_URL,
  });

}

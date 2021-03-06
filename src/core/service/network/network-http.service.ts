import axios, { AxiosError, AxiosInstance } from 'axios';
import { inject } from 'inversify';

import {
  Environment, NetworkRequestOptions, NetworkResponse, NetworkService,
} from '@/core/service/network/network.service';
import { ConfigService } from '@/core/service/config/config.service';
import { PersistenceService } from '@/core/service/persistence/persistence.service';
import { ServerError, UndefinedError } from '@/core/utils/errors';


/**
 * @class NetworkServiceHttpImpl
 * @extends NetworkService
 * @public
 */
export class NetworkServiceHttpImpl extends NetworkService {

  private axios: AxiosInstance;

  public constructor(
    @inject(PersistenceService) private persistenceService: PersistenceService,
    @inject(ConfigService) private configService: ConfigService,
  ) {
    super();
    this.environment = this.getEnvironment();

    this.axios = axios.create({
      baseURL: this.environment.base,
    });

    this.axios.interceptors.response.use(this.responseInterceptor, this.unauthorizedResponseInterceptor);
    this.axios.interceptors.request.use(this.tokenRequestInterceptor);
  }

  public get<T>(url: string, options?: NetworkRequestOptions): Promise<NetworkResponse<T>> {
    return this.axios.get(url, options).then(response => response.data)
      .catch(error => this.handleError(error));
  }

  public post<T, K>(url: string, body?: K, options?: NetworkRequestOptions): Promise<NetworkResponse<T>> {
    return this.axios.post(url, body, options).then(response => response.data)
      .catch(error => this.handleError(error));
  }

  public put<T, K>(url: string, body?: K, options?: NetworkRequestOptions): Promise<NetworkResponse<T>> {
    return this.axios.put(url, body, options).then(response => response.data)
      .catch(error => this.handleError(error));
  }

  public patch<T, K>(url: string, body?: K, options?: NetworkRequestOptions): Promise<NetworkResponse<T>> {
    return this.axios.patch(url, body, options).then(response => response.data)
      .catch(error => this.handleError(error));
  }

  public delete<T, K>(url: string, options?: NetworkRequestOptions): Promise<NetworkResponse<T>> {
    return this.axios.delete(url, options).then(response => response.data)
      .catch(error => this.handleError(error));
  }

  private tokenRequestInterceptor = config => {
    const modifiedConfig = Object.assign({}, config);
    const { apiToken } = this.configService.frontendConfig;
    modifiedConfig.headers = {
      Authorization: `Basic ${apiToken}`,
      Accept: 'application/vnd.meshcloud.api.meshcustomer.v1.hal+json',
    };
    return modifiedConfig;
  };

  // unifies the response to make it generic
  private responseInterceptor = response => {
    const modifiedResponse = Object.assign({}, response);
    modifiedResponse.data = { data: response.data };
    return modifiedResponse;
  };

  // if (this.isUnauthorizedErrorStatus(error)) {
  //   this.persistenceService.clearValue(PersistenceService.VALUE_NAME.TOKEN);
  // }
  private unauthorizedResponseInterceptor = error => Promise.reject(error);

  private isUnauthorizedErrorStatus(error: any) {
    try {
      return error.response.status === 401;
    } catch (e) {
      return false;
    }
  }

  private handleError(error: AxiosError) {
    const { status } = error.response;

    if (status === 500) {
      throw new UndefinedError(error);
    }

    const type = error.response.data && error.response.data.type;
    if (!type) {
      throw new UndefinedError(error);
    }

    throw new ServerError(error, type);
  }

  private getEnvironment(): Environment {
    const frontConfig = this.configService.frontendConfig;
    return {
      base: frontConfig.apiGateway,
      customers: {
        list: '/customers',
      },
      limitedPaymentMethods: {
        create: '/customers/{customerIdentifier}/limitedPaymentMethods/{paymentIdentifier}',
      },
    };
  }

}

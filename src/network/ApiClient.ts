import {DEFAULT_API_TIMEOUT, HttpMethod} from '@network/Constants';
import {IApiConfig} from '@network/interfaces';
import {LocalStorage, LocalStorageKeys} from '@utils/LoacalStorage';
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

class ApiClient {
  private readonly baseUrl: string;
  private readonly requestTimeout?: number;
  private client: AxiosInstance;

  constructor(config: IApiConfig) {
    this.baseUrl = config.baseUrl;
    this.requestTimeout = config.requestTimeout || DEFAULT_API_TIMEOUT;
    this.client = this.createClient();
  }

  private createClient(): AxiosInstance {
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: this.requestTimeout,
    });
    // Adding gzip compression headers to improve network performance
    axiosInstance.defaults.headers.get['Accept-Encoding'] = 'gzip, deflate';
    axiosInstance.interceptors.request.use(
      (value: AxiosRequestConfig) => ApiClient.requestHandler(value),
      (error: any) => this.errorHandler(error),
    );

    axiosInstance.interceptors.response.use(
      (value: AxiosResponse) => value,
      (error: Error) => this.errorHandler(error),
    );

    return axiosInstance;
  }

  private static async requestHandler(
    request: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig> {
    const token = await LocalStorage.get(LocalStorageKeys.TOKEN);
    request.headers.Authorization = 'Bearer ' + token;
    return request;
  }

  private errorHandler = (error: Error): Promise<string> => {
    return Promise.reject(error.message);
  };

  // data is body
  public get = (params?: {}, headers?: {}): Promise<any> => {
    return this.client.request({
      method: HttpMethod.GET,
      headers,
      params,
    });
  };

  public post = (data?: {}, headers?: {}, params?: {}): Promise<any> => {
    return this.client.request({
      method: HttpMethod.POST,
      data,
      headers,
      params,
    });
  };
}

export default ApiClient;

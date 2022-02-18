import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  HttpGetClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '~/data/http';

export enum HttpMethods {
  get = 'GET',
  post = 'POST',
  delete = 'DELETE',
  put = 'PUT',
}

export const unexpectedErrorResponse: AxiosResponse = {
  data: null,
  status: HttpStatusCode.unauthorized,
  statusText: 'Unexpected error',
  headers: {},
  config: {},
};

type HttpRequestMethod<T> = Partial<T> & { method: HttpMethods };

export class AxiosAdapter implements HttpGetClient {
  private async request(
    data: HttpRequestMethod<HttpRequest>,
  ): Promise<HttpResponse<any>> {
    let axiosResponse = {} as AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        headers: data.headers,
        data: data.body,
        method: data.method,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        axiosResponse = axiosError.response;
      } else {
        axiosResponse = unexpectedErrorResponse;
      }
    } finally {
      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      };
    }
  }

  async get(data: HttpRequest): Promise<HttpResponse<any>> {
    return await this.request({
      url: data.url,
      headers: data.headers,
      method: HttpMethods.get,
      body: data.body,
    });
  }
}

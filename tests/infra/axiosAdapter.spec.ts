import axios, { AxiosResponse } from 'axios';
import faker from 'faker';
import { HttpGetClient, HttpRequest, HttpResponse } from '~/data/http';
import { makeUrl } from '../data/helpers/testFactories';

jest.mock('axios');

export const mockHttpResponse = (): AxiosResponse => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
  statusText: faker.random.objectElement(),
  headers: {},
  config: {},
});

export const toHttpResponse = (response: AxiosResponse): HttpResponse => {
  return {
    body: response.data,
    statusCode: response.status,
  };
};

export const mockHttpRequest = (): HttpRequest => {
  return {
    url: makeUrl(),
    body: faker.random.objectElement(),
    headers: faker.random.objectElement(),
  };
};

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse());
  return mockedAxios;
};

describe('Infra: AxiosAdapter', () => {
  test('should request through the axiosAdapter the correct information', async () => {
    const request = mockHttpRequest();
    const sut = new AxiosAdapter();
    const mockedAxios = mockAxios();
    await sut.get(request);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: HttpMethods.get,
    } as HttpAxiosRequest);
  });

  test('should request through the axiosAdapter a correct response', async () => {
    const request = mockHttpRequest();
    const sut = new AxiosAdapter();
    const mockedAxios = mockAxios();
    const httpResponse = await sut.get(request);
    const axiosResponse = await mockedAxios.request.mock.results[0].value;
    expect(httpResponse).toEqual(toHttpResponse(axiosResponse));
  });
});

enum HttpMethods {
  get = 'GET',
  post = 'POST',
  delete = 'DELETE',
  put = 'PUT',
}

type HttpAxiosRequest = {
  url: string;
  data?: any;
  headers?: any;
  method?: HttpMethods;
};

type HttpRequestMethod<T> = Partial<T> & { method: HttpMethods };

class AxiosAdapter implements HttpGetClient {
  async request(
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

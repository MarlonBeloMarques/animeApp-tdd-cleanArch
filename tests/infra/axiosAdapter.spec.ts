import axios, { AxiosError, AxiosResponse } from 'axios';
import faker from 'faker';
import { HttpGetClient, HttpRequest, HttpResponse } from '~/data/http';

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
    url: faker.internet.url(),
    body: faker.random.objectElement(),
    headers: faker.random.objectElement(),
  };
};

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse());
  return mockedAxios;
};

const makeSut = (): {
  httpRequest: HttpRequest;
  sut: AxiosAdapter;
  mockedAxios: jest.Mocked<typeof axios>;
} => {
  return {
    httpRequest: mockHttpRequest(),
    sut: new AxiosAdapter(),
    mockedAxios: mockAxios(),
  };
};

describe('Infra: AxiosAdapter', () => {
  test('should request through the axiosAdapter the correct information', async () => {
    const { sut, mockedAxios, httpRequest } = makeSut();
    await sut.get(httpRequest);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: httpRequest.url,
      data: httpRequest.body,
      headers: httpRequest.headers,
      method: HttpMethods.get,
    } as HttpAxiosRequest);
  });

  test('should request through the axiosAdapter a correct response', async () => {
    const { sut, mockedAxios, httpRequest } = makeSut();
    const httpResponse = await sut.get(httpRequest);
    const axiosResponse = await mockedAxios.request.mock.results[0].value;
    expect(httpResponse).toEqual(toHttpResponse(axiosResponse));
  });

  test('should request through axiosAdapter an error response', async () => {
    const { sut, mockedAxios, httpRequest } = makeSut();
    mockedAxios.request.mockClear().mockRejectedValueOnce({
      response: mockHttpResponse(),
    });

    const httpResponse = await sut.get(httpRequest);
    try {
      await mockedAxios.request.mock.results[0].value;
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      const httpErrorResponse = toHttpResponse(errorResponse as AxiosResponse);
      expect(httpResponse).toEqual(httpErrorResponse);
    }
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

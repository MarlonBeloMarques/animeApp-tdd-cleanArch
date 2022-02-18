import axios, { AxiosError, AxiosResponse } from 'axios';
import { HttpRequest } from '~/data/http';
import {
  AxiosAdapter,
  HttpMethods,
  unexpectedErrorResponse,
} from '~/infra/http';
import { toHttpResponse } from '../helpers';
import { mockAxios, mockHttpRequest, mockHttpResponse } from '../mocks';

jest.mock('axios');

type HttpAxiosRequest = {
  url: string;
  data?: any;
  headers?: any;
  method?: HttpMethods;
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

  test('should request through axiosAdapter an unexpected error response', async () => {
    const { sut, mockedAxios, httpRequest } = makeSut();
    mockedAxios.request
      .mockClear()
      .mockRejectedValueOnce(unexpectedErrorResponse);

    const httpResponse = await sut.get(httpRequest);
    try {
      await mockedAxios.request.mock.results[0].value;
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      const errorResponse = error as AxiosResponse;
      const httpErrorResponse = toHttpResponse(errorResponse);
      expect(httpResponse).toEqual(httpErrorResponse);
    }
  });
});

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

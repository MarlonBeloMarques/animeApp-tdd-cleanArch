import { AxiosResponse } from 'axios';
import { HttpResponse } from '~/data/http';

export const toHttpResponse = (response: AxiosResponse): HttpResponse => {
  return {
    body: response.data,
    statusCode: response.status,
  };
};

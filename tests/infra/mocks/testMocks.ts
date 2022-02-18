import { AxiosResponse } from 'axios';
import faker from 'faker';
import { HttpRequest } from '~/data/http';

export const mockHttpResponse = (): AxiosResponse => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
  statusText: faker.random.objectElement(),
  headers: {},
  config: {},
});

export const mockHttpRequest = (): HttpRequest => {
  return {
    url: faker.internet.url(),
    body: faker.random.objectElement(),
    headers: faker.random.objectElement(),
  };
};

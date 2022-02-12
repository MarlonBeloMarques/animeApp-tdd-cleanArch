import { HttpStatusCode } from './httpStatusCode';

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};

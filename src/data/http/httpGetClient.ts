import { HttpRequest } from './httpRequest';
import { HttpResponse } from './httpResponse';

export interface HttpGetClient<R = any> {
  get(data: HttpRequest): Promise<HttpResponse<R>>;
}

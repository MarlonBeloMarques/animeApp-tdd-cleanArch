import {
  HttpGetClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '~/data/http';
import { Anime } from '~/domain/useCases';

export class HttpClientSpy implements HttpGetClient {
  private _url!: string;
  private _headers!: any;
  private response: HttpResponse<Array<Anime.Model>> = {
    statusCode: HttpStatusCode.ok,
  };

  async get(data: HttpRequest): Promise<HttpResponse<Array<Anime.Model>>> {
    this._url = data.url;
    this._headers = data.headers;
    return this.response;
  }

  completeWithSuccessData(data: Array<Anime.Model>) {
    this.response = { statusCode: HttpStatusCode.ok, body: data };
  }

  completeWithError(
    error: HttpStatusCode.badRequest | HttpStatusCode.notFound,
  ) {
    this.response = { statusCode: error };
  }

  completeWithUnexpectedError() {
    this.response = { statusCode: HttpStatusCode.internalServerError };
  }

  get url(): string {
    return this._url;
  }

  get headers(): any {
    return this._headers;
  }
}

describe('Data: RemoteAuthentication', () => {
  test('should authenticate with httpClient call correct url', () => {
    const url = 'http://any-url.com';
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAuthentication(url, httpClientSpy);
    sut.authenticate();
    expect(httpClientSpy.url.length).not.toBe(0);
    expect(httpClientSpy.url).toMatch(new RegExp(url));
  });

  test('should authenticate with the correct parameters of the httpClient call', () => {
    const url = 'http://any-url.com';
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAuthentication(url, httpClientSpy);
    const params: Authentication.Params = {
      responseType: 'response_type=token',
      clientId: 'client_id=any_client_id',
      redirectUri: 'redirect_uri=any_redirect_uri',
    };
    sut.completeUrlWithParam(params);
    sut.authenticate();
    expect(httpClientSpy.url.length).not.toBe(0);
    expect(httpClientSpy.url).toMatch(new RegExp(params.responseType));
    expect(httpClientSpy.url).toMatch(new RegExp(params.clientId));
    expect(httpClientSpy.url).toMatch(new RegExp(params.redirectUri));
  });

  test('should authentication with httpClient call response with expected error', async () => {
    const url = 'http://any-url.com';
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAuthentication(url, httpClientSpy);
    try {
      await sut.authenticate();
    } catch (error) {
      expect(error).toEqual(new UnexpectedError());
    }
  });
});

class RemoteAuthentication implements Authentication {
  private url: string;
  private httpClient: HttpGetClient;

  constructor(url: string, httpClient: HttpGetClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async authenticate(): Promise<Authentication.Model> {
    const { statusCode } = await this.httpClient.get({ url: this.url });
    switch (statusCode) {
      default:
        throw new UnexpectedError();
    }
  }

  completeUrlWithParam(params: Authentication.Params): void {
    this.url = `${this.url}?${params.responseType}&${params.clientId}&${params.redirectUri}`;
  }
}

enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  internalServerError = 500,
}
class HttpClientSpy implements HttpGetClient {
  private _url!: string;
  private response: HttpResponse<Authentication.Model> = {
    statusCode: HttpStatusCode.internalServerError,
  };

  async get(data: HttpRequest): Promise<HttpResponse<Authentication.Model>> {
    this._url = data.url;
    return this.response;
  }

  get url(): string {
    return this._url;
  }
}

interface Authentication {
  authenticate(): Promise<Authentication.Model>;
}

interface HttpGetClient {
  get(data: HttpRequest): Promise<HttpResponse<Authentication.Model>>;
}

namespace Authentication {
  export type Params = {
    responseType: string;
    clientId: string;
    redirectUri: string;
  };

  export type Model = {
    token: string;
  };
}

type HttpRequest = {
  url: string;
  body?: any;
  headers?: any;
};

type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};

class UnexpectedError extends Error {
  constructor() {
    super();
    this.message =
      'Unexpected error. Please check your internet and try again.';
    this.name = 'UnexpectedError';
  }
}

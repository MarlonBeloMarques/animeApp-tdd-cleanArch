describe('Data: RemoteAuthentication', () => {
  test('should authenticate with OAuthClient call correct url', () => {
    const url = 'http://any-url.com';
    const [sut, oAuthClientSpy] = makeSut(url);
    sut.authenticate();
    expect(oAuthClientSpy.url.length).not.toBe(0);
    expect(oAuthClientSpy.url).toMatch(new RegExp(url));
  });

  test('should authenticate with the correct parameters of the OAuthClient call', () => {
    const [sut, oAuthClientSpy] = makeSut('http://any-url.com');
    const params = makeAuthenticationParams();
    sut.completeUrlWithParam(params);
    sut.authenticate();
    expect(oAuthClientSpy.url.length).not.toBe(0);
    expect(oAuthClientSpy.url).toMatch(new RegExp(params.responseType));
    expect(oAuthClientSpy.url).toMatch(new RegExp(params.clientId));
    expect(oAuthClientSpy.url).toMatch(new RegExp(params.redirectUri));
  });

  test('should authentication with OAuthClient call response with expected error', async () => {
    const url = '//any-url.com';
    const [sut] = makeSut(url);
    try {
      await sut.authenticate();
      throw Error('an invalid url is expected');
    } catch (error) {
      expect(error).toEqual(new UnexpectedError());
    }
  });
});

const makeSut = (url: string): [RemoteAuthentication, OAuthClientSpy] => {
  const oAuthClientSpy = new OAuthClientSpy();
  const sut = new RemoteAuthentication(url, oAuthClientSpy);
  return [sut, oAuthClientSpy];
};

const makeAuthenticationParams = (): Authentication.Params => {
  return {
    responseType: 'response_type=token',
    clientId: 'client_id=any_client_id',
    redirectUri: 'redirect_uri=any_redirect_uri',
  };
};

class RemoteAuthentication implements Authentication {
  private url: string;
  private oAuthClient: OAuthClient;

  constructor(url: string, oAuthClient: OAuthClient) {
    this.url = url;
    this.oAuthClient = oAuthClient;
  }

  authenticate(): void {
    let url: URL;
    try {
      url = new URL(this.url);
      this.oAuthClient.redirect({ url: url.toJSON() });
    } catch (error) {
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
class OAuthClientSpy implements OAuthClient {
  private _url!: string;

  redirect(data: OAuthRequest) {
    this._url = data.url;
  }

  get url(): string {
    return this._url;
  }
}

interface Authentication {
  authenticate(): void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface HttpGetClient<R = any> {
  get(data: HttpRequest): Promise<HttpResponse<R>>;
}

interface OAuthClient {
  redirect(data: OAuthRequest): void;
}

namespace Authentication {
  export type Params = {
    responseType: string;
    clientId: string;
    redirectUri: string;
  };
}

type OAuthRequest = {
  url: string;
};

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

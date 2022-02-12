describe('Data: RemoteAuthentication', () => {
  test('should authenticate with httpClient call correct url', () => {
    const url = 'http://any-url.com';
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAuthentication(url, httpClientSpy);
    const params: Authentication.Params = {
      clientId: 'any_client_id',
      redirectUri: 'any_redirect_uri',
    };
    sut.authenticate(params);
    expect(httpClientSpy.url.length).not.toBe(0);
    expect(httpClientSpy.url).toMatch(new RegExp(url));
  });

  test('should authenticate with the correct parameters of the httpClient call', () => {
    const url = 'http://any-url.com';
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAuthentication(url, httpClientSpy);
    const params: Authentication.Params = {
      clientId: 'any_client_id',
      redirectUri: 'any_redirect_uri',
    };
    sut.authenticate(params);
    expect(httpClientSpy.url.length).not.toBe(0);
    expect(httpClientSpy.url).toMatch(new RegExp(params.clientId));
    expect(httpClientSpy.url).toMatch(new RegExp(params.redirectUri));
  });
});

class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient,
  ) {}

  authenticate(params: Authentication.Params): Authentication.Model {
    const urlWithParam = `${this.url}?response_type=token&client_id=${params.clientId}&redirect_uri=${params.redirectUri}`;
    return this.httpClient.get(urlWithParam);
  }
}

class HttpClientSpy implements HttpGetClient {
  private _url!: string;

  get(url: string): Authentication.Model {
    this._url = url;
    return { token: '' };
  }

  get url(): string {
    return this._url;
  }
}

interface Authentication {
  authenticate(params: Authentication.Params): Authentication.Model;
}

interface HttpGetClient {
  get(url: string): Authentication.Model;
}

namespace Authentication {
  export type Params = {
    clientId: string;
    redirectUri: string;
  };

  export type Model = {
    token: string;
  };
}

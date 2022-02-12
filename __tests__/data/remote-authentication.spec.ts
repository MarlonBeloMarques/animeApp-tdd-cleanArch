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
});

class RemoteAuthentication implements Authentication {
  private url: string;
  private httpClient: HttpGetClient;

  constructor(url: string, httpClient: HttpGetClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  authenticate(): Authentication.Model {
    return this.httpClient.get(this.url);
  }

  completeUrlWithParam(params: Authentication.Params): void {
    this.url = `${this.url}?${params.responseType}&${params.clientId}&${params.redirectUri}`;
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
  authenticate(): Authentication.Model;
}

interface HttpGetClient {
  get(url: string): Authentication.Model;
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

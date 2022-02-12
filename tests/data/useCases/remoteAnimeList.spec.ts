import { HttpGetClient } from '../http';
import { HttpRequest } from '../http/httpRequest';
import { HttpResponse } from '../http/httpResponse';

describe('Data: RemoteAnimeList', () => {
  test('should list with httpGetClient call correct url', async () => {
    const url = 'http://any-url.com';
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAnimeList(url, httpClientSpy);
    sut.list();
    expect(httpClientSpy.url.length).not.toBe(0);
    expect(httpClientSpy.url).toMatch(new RegExp(url));
  });

  test('should list with httpGetClient call correct authorization', async () => {
    const url = 'http://any-url.com';
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAnimeList(url, httpClientSpy);
    const authorization = 'any_authorization';
    sut.list(authorization);
    expect(Object.entries(httpClientSpy.headers).toString()).toMatch(
      new RegExp(authorization),
    );
  });
});

class RemoteAnimeList implements AnimeList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient,
  ) {}

  async list(authorization?: string): Promise<HttpResponse<Anime.Model>> {
    return await this.httpClient.get({
      url: this.url,
      headers: { Authorization: `Bearer ${authorization}` },
    });
  }
}

class HttpClientSpy implements HttpGetClient {
  private _url!: string;
  private _headers!: any;

  get(data: HttpRequest): Promise<HttpResponse<Anime.Model>> {
    this._url = data.url;
    this._headers = data.headers;
    throw Error();
  }

  get url(): string {
    return this._url;
  }

  get headers(): any {
    return this._headers;
  }
}

interface AnimeList {
  list(authorization?: string): Promise<HttpResponse<Anime.Model>>;
}

namespace Anime {
  export type Model = {
    titles: {
      en: string;
    };
    descriptions: {
      en: string;
    };
    start_date: string;
    episodes_count: number;
    genres: Array<string>;
    id: number;
    cover_image: string;
    banner_image: string;
  };
}

import faker from 'faker';
import { AnimeContentError, UnexpectedError } from '~/data/errors';
import {
  HttpGetClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '~/data/http';

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

  test('should list with HttpGetClient call response with expected error', async () => {
    const url = 'http://any-url.com';
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAnimeList(url, httpClientSpy);
    try {
      httpClientSpy.completeWithUnexpectedError();
      await sut.list();
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UnexpectedError());
    }
  });

  test('should list with HttpGetClient call response with anime content error', async () => {
    const url = 'http://any-url.com';
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAnimeList(url, httpClientSpy);
    try {
      httpClientSpy.completeWithError(HttpStatusCode.notFound);
      await sut.list();
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new AnimeContentError());
    }
  });

  test('should list with HttpGetClient call response with success', async () => {
    const url = 'http://any-url.com';
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAnimeList(url, httpClientSpy);
    const data = makeAnimeModelList();
    httpClientSpy.completeWithSuccessData(data);
    const response = await sut.list();
    expect(response).toEqual(data);
  });
});

class RemoteAnimeList implements AnimeList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient,
  ) {}

  async list(
    authorization?: string,
  ): Promise<HttpResponse<Array<Anime.Model>>> {
    const { statusCode, body } = await this.httpClient.get({
      url: this.url,
      headers: { Authorization: `Bearer ${authorization}` },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body!;
      case HttpStatusCode.notFound:
        throw new AnimeContentError();
      case HttpStatusCode.badRequest:
        throw new AnimeContentError();
      default:
        throw new UnexpectedError();
    }
  }
}

class HttpClientSpy implements HttpGetClient {
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

const makeAnimeModelList = (): Array<Anime.Model> => {
  const animeList: Array<Anime.Model> = [];
  faker.locale = 'en';
  for (let index = 0; index < 5; index++) {
    animeList.push({
      titles: {
        en: faker.name.title(),
      },
      descriptions: {
        en: faker.commerce.productDescription(),
      },
      start_date: faker.date.past().toISOString(),
      episodes_count: faker.datatype.number(),
      genres: ['Adventure', 'Action'],
      id: faker.datatype.number(),
      cover_image: faker.image.avatar(),
      banner_image: faker.image.avatar(),
    });
  }

  return animeList;
};

interface AnimeList {
  list(authorization?: string): Promise<HttpResponse<Array<Anime.Model>>>;
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

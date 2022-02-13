import faker from 'faker';
import { AnimeContentError, UnexpectedError } from '~/data/errors';
import { HttpStatusCode } from '~/data/http';
import { Anime } from '~/domain/useCases';
import { RemoteAnimeList } from '~/data/useCases';
import { HttpClientSpy } from '../http';

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

  test('should list with HttpGetClient call response with anime content error for not found', async () => {
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

  test('should list with HttpGetClient call response with anime content error for bad request', async () => {
    const url = 'http://any-url.com';
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAnimeList(url, httpClientSpy);
    try {
      httpClientSpy.completeWithError(HttpStatusCode.badRequest);
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

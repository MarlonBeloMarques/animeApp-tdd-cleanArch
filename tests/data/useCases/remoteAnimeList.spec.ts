import { AnimeContentError, UnexpectedError } from '~/data/errors';
import { HttpStatusCode } from '~/data/http';
import { RemoteAnimeList } from '~/data/useCases';
import { Anime } from '~/domain/useCases';
import { HttpClientSpy } from '../http';
import { makeAnimeModelList, makeUrl } from '../helpers';

describe('Data: RemoteAnimeList', () => {
  test('should list with httpGetClient call correct url', async () => {
    const url = makeUrl();
    const [sut, httpClientSpy] = makeSut(url);
    sut.list();
    expect(httpClientSpy.url.length).not.toBe(0);
    expect(httpClientSpy.url).toMatch(new RegExp(url));
  });

  test('should list with httpGetClient call correct authorization', async () => {
    const [sut, httpClientSpy] = makeSut();
    const authorization = 'any_authorization';
    sut.list(authorization);
    expect(Object.entries(httpClientSpy.headers).toString()).toMatch(
      new RegExp(authorization),
    );
  });

  test('should list with HttpGetClient call response with expected error', async () => {
    const [sut, httpClientSpy] = makeSut();
    try {
      httpClientSpy.completeWithUnexpectedError();
      await sut.list();
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UnexpectedError());
    }
  });

  test('should list with HttpGetClient call response with anime content error for not found', async () => {
    const [sut] = makeSut(makeUrl(), HttpStatusCode.notFound);
    try {
      await sut.list();
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new AnimeContentError());
    }
  });

  test('should list with HttpGetClient call response with anime content error for bad request', async () => {
    const [sut] = makeSut(makeUrl(), HttpStatusCode.badRequest);
    try {
      await sut.list();
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new AnimeContentError());
    }
  });

  test('should list with HttpGetClient call response with success', async () => {
    const data = makeAnimeModelList();
    const [sut] = makeSut(makeUrl(), undefined, data);
    const response = await sut.list();
    expect(response).toEqual(data);
  });
});

const makeSut = (
  url: string = makeUrl(),
  completeWithError?: HttpStatusCode.badRequest | HttpStatusCode.notFound,
  completeWithSuccess?: Array<Anime.Model>,
): [RemoteAnimeList, HttpClientSpy] => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteAnimeList(url, httpClientSpy);
  if (completeWithError) httpClientSpy.completeWithError(completeWithError);
  if (completeWithSuccess)
    httpClientSpy.completeWithSuccessData(completeWithSuccess);
  return [sut, httpClientSpy];
};

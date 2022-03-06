import { AnimeDetailToNavigation, RemoteAnimeList } from '~/data/useCases';
import { makeAnimeModel, makeUrl } from '../helpers';
import { HttpClientSpy } from '../http';

describe('Data: AnimeDetailToNavigation', () => {
  test('should get anime details from anime list successfully', async () => {
    const { sut } = await makeSut();
    const animeDetail = sut.get();
    expect(animeDetail).toBeTruthy();
  });
});

const makeSut = async () => {
  const httpClientSpy = new HttpClientSpy();
  httpClientSpy.completeWithSuccessData(makeAnimeModel());
  const remoteAnimeList = new RemoteAnimeList(makeUrl(), httpClientSpy);
  const anime = await remoteAnimeList.list();
  const firstAnime = anime.data.documents[0];
  return { sut: new AnimeDetailToNavigation(firstAnime) };
};

import { RemoteAnimeList } from '~/data/useCases';
import { AnimeList } from '~/domain/useCases';
import { AxiosAdapter } from '~/infra/http';

const remoteAnimeListFactory = (): AnimeList => {
  const url = 'https://api.aniapi.com/v1/anime';
  const axiosAdapter = new AxiosAdapter();
  return new RemoteAnimeList(url, axiosAdapter);
};

export default remoteAnimeListFactory;

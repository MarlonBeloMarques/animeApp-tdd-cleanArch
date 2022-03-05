import { AnimeModelDocument } from '~/domain/models';
import { RemoteAnimeList } from '~/data/useCases';
import { makeAnimeModel, makeUrl } from '../helpers';
import { HttpClientSpy } from '../http';

describe('Data: AnimeDetailToNavigation', () => {
  test('should get anime details from anime list successfully', async () => {
    const url = makeUrl();
    const httpClientSpy = new HttpClientSpy();
    httpClientSpy.completeWithSuccessData(makeAnimeModel());
    const remoteAnimeList = new RemoteAnimeList(url, httpClientSpy);
    const anime = await remoteAnimeList.list();
    const firstAnime = anime.data.documents[0];
    const sut = new AnimeDetailToNavigation(firstAnime);
    const animeDetail = sut.get();

    expect(animeDetail).toBeTruthy();
  });
});

class AnimeDetailToNavigation implements AnimeDetail {
  constructor(private animeModel: AnimeModelDocument) {}

  get(): AnimeDetail.Detail {
    return {
      titles: this.animeModel.titles,
      descriptions: this.animeModel.descriptions,
      episodes_count: this.animeModel.episodes_count,
      genres: this.animeModel.genres,
      start_date: this.animeModel.start_date,
    };
  }
}

interface AnimeDetail {
  get(): AnimeDetail.Detail;
}

export namespace AnimeDetail {
  export type Detail = {
    titles: {
      en: string;
    };
    descriptions: {
      en: string;
    };
    genres: Array<string>;
    episodes_count: number;
    start_date: string;
  };
}

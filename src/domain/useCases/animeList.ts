import { HttpResponse } from '~/data/http';

export interface AnimeList {
  list(authorization?: string): Promise<HttpResponse<Array<Anime.Model>>>;
}

export namespace Anime {
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

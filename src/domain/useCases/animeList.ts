import { HttpResponse } from '~/data/http';
import { AnimeModel } from '../models';

export interface AnimeList {
  list(authorization?: string): Promise<HttpResponse<Array<Anime.Model>>>;
}

export namespace Anime {
  export type Model = AnimeModel;
}

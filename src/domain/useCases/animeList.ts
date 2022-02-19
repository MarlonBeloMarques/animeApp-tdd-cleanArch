import { HttpResponse } from '~/data/http';
import { AnimeModel, AnimeModelDocument } from '../models';

export interface AnimeList {
  list(authorization?: string): Promise<HttpResponse<Anime.Model>>;
}

export namespace Anime {
  export type Model = AnimeModel;
  export type ModelDocument = AnimeModelDocument;
  export type Params = {
    locale: string;
    page: number;
    per_page: number;
  };
}

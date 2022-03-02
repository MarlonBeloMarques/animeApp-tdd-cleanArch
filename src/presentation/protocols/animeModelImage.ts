import { Anime } from '~/domain/useCases';
import { ModelDocumentImageList } from '../protocols';

export interface AnimeModelImage {
  toAnimeModelImage(): AnimeModelImage.Model;
}

export namespace AnimeModelImage {
  export type Model = {
    status_code: number;
    message: string;
    data: {
      current_page: number;
      count: number;
      documents: ModelDocumentImageList.ModelDocumentImage<Anime.ModelDocument>[];
      last_page: number;
    };
  };
}

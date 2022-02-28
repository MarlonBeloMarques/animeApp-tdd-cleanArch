import { Anime } from '~/domain/useCases';

export interface ModelDocumentImageList {
  toModelDocumentImageList(): Array<
    ModelDocumentImageList.ModelDocumentImage<Anime.ModelDocument>
  >;
}

export namespace ModelDocumentImageList {
  export type ModelDocumentImage<T> = Partial<T> & {
    cover_image_size: CoverImageSize;
  };

  export type CoverImageSize = {
    width: number;
    height: number;
  };
}

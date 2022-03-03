import { Anime } from '~/domain/useCases';
import { ModelDocumentImageList } from '../protocols';

export class ModelDocumentListMapper implements ModelDocumentImageList {
  constructor(protected modelDocumentList: Array<Anime.ModelDocument>) {}

  toModelDocumentImageList = (): Array<
    ModelDocumentImageList.ModelDocumentImage<Anime.ModelDocument>
  > => {
    const modelDocumentImageList: Array<
      ModelDocumentImageList.ModelDocumentImage<Anime.ModelDocument>
    > = [];

    this.modelDocumentList.map((modelDocument) => {
      modelDocumentImageList.push(this.toModelDocumentImage(modelDocument));
    });

    return modelDocumentImageList;
  };

  protected toModelDocumentImage = (
    modelDocument: Anime.ModelDocument,
  ): ModelDocumentImageList.ModelDocumentImage<Anime.ModelDocument> => {
    return {
      titles: modelDocument.titles,
      cover_image_size: { height: 0, width: 0 },
      banner_image: modelDocument.banner_image,
      cover_image: modelDocument.cover_image,
      descriptions: modelDocument.descriptions,
      episodes_count: modelDocument.episodes_count,
      genres: modelDocument.genres,
      id: modelDocument.id,
      start_date: modelDocument.start_date,
    };
  };
}

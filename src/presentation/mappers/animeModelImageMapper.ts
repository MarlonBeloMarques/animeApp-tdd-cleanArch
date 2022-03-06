import { AnimeModelDocument } from '~/domain/models';
import { ModelDocument, ModelDocumentImageList } from '../protocols';

export class AnimeModelImageMapper implements ModelDocument {
  constructor(
    private modelDocumentImage: ModelDocumentImageList.ModelDocumentImage<AnimeModelDocument>,
  ) {}
  toModelDocument(): AnimeModelDocument {
    return {
      banner_image: this.modelDocumentImage.banner_image!,
      cover_image: this.modelDocumentImage.cover_image!,
      descriptions: this.modelDocumentImage.descriptions!,
      episodes_count: this.modelDocumentImage.episodes_count!,
      genres: this.modelDocumentImage.genres!,
      id: this.modelDocumentImage.id!,
      start_date: this.modelDocumentImage.start_date!,
      titles: this.modelDocumentImage.titles!,
    };
  }
}

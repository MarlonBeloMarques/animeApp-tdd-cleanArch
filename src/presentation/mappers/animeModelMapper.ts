import { Anime } from '~/domain/useCases';
import { AnimeModelImage, ModelDocumentImageList } from '../protocols';

export class AnimeModelMapper implements AnimeModelImage {
  constructor(
    private animeModel: Anime.Model,
    private modelDocumentImageList: ModelDocumentImageList,
  ) {}

  toAnimeModelImage(): AnimeModelImage.Model {
    return {
      status_code: this.animeModel.status_code,
      message: this.animeModel.message,
      data: {
        current_page: this.animeModel.data.current_page,
        count: this.animeModel.data.count,
        documents: this.modelDocumentImageList.toModelDocumentImageList(),
        last_page: this.animeModel.data.count,
      },
    };
  }
}

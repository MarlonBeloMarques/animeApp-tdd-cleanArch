import { AnimeModelDocument } from '~/domain/models';
import { AnimeDetail } from '~/domain/useCases';

export class AnimeDetailToNavigation implements AnimeDetail {
  constructor(private animeModel: AnimeModelDocument) {}

  get(): AnimeDetail.Detail {
    return {
      titles: this.animeModel.titles,
      descriptions: this.animeModel.descriptions,
      episodes_count: this.animeModel.episodes_count,
      genres: this.animeModel.genres,
      start_date: this.animeModel.start_date,
      banner_image: this.animeModel.banner_image,
      cover_image: this.animeModel.cover_image,
    };
  }
}

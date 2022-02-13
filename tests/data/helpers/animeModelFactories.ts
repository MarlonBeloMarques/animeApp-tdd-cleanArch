import faker from 'faker';
import { Anime } from '~/domain/useCases';

export const makeAnimeModelList = (): Array<Anime.Model> => {
  const animeList: Array<Anime.Model> = [];
  faker.locale = 'en';
  for (let index = 0; index < 5; index++) {
    animeList.push({
      titles: {
        en: faker.name.title(),
      },
      descriptions: {
        en: faker.commerce.productDescription(),
      },
      start_date: faker.date.past().toISOString(),
      episodes_count: faker.datatype.number(),
      genres: ['Adventure', 'Action'],
      id: faker.datatype.number(),
      cover_image: faker.image.avatar(),
      banner_image: faker.image.avatar(),
    });
  }

  return animeList;
};

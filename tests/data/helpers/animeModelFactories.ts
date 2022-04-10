import faker from 'faker';
import { Anime } from '~/domain/useCases';

export const makeAnimeModel = (length = 5): Anime.Model => {
  const anime: Anime.Model = {
    status_code: faker.datatype.number(),
    message: faker.lorem.lines(),
    data: {
      current_page: faker.datatype.number(),
      count: faker.datatype.number(),
      documents: fakeAnimeModelDocument(length),
      last_page: faker.datatype.number(),
    },
  };

  return anime;
};

export const fakeAnimeModelDocument = (
  length = 5,
): Array<Anime.ModelDocument> => {
  faker.locale = 'en';
  const documentList: Array<Anime.ModelDocument> = [];
  for (let index = 0; index < length; index++) {
    documentList.push({
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

  return documentList;
};

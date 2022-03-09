import faker from 'faker';
import { AnimeDetail } from '~/domain/useCases';

export const makeAnimeDetail = (): AnimeDetail.Detail => {
  return {
    banner_image: faker.internet.url(),
    cover_image: faker.internet.url(),
    descriptions: { en: faker.commerce.productDescription() },
    episodes_count: faker.datatype.number(),
    genres: ['Adventure', 'Action'],
    start_date: faker.date.past().toISOString(),
    titles: {
      en: faker.name.title(),
    },
  };
};

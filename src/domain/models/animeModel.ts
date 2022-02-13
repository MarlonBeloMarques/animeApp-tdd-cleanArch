export type AnimeModel = {
  titles: {
    en: string;
  };
  descriptions: {
    en: string;
  };
  start_date: string;
  episodes_count: number;
  genres: Array<string>;
  id: number;
  cover_image: string;
  banner_image: string;
};

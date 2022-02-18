export type AnimeModel = {
  status_code: number;
  message: string;
  data: {
    current_page: number;
    count: number;
    documents: {
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
    last_page: number;
  };
};

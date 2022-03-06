export interface AnimeDetail {
  get(): AnimeDetail.Detail;
}

export namespace AnimeDetail {
  export type Detail = {
    titles: {
      en: string;
    };
    descriptions: {
      en: string;
    };
    genres: Array<string>;
    episodes_count: number;
    start_date: string;
  };
}

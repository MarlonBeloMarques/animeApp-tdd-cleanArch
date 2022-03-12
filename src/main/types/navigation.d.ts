const { Routes, AnimeDetail } = Modules;

declare type StackParams = {
  [Routes.AUTHENTICATION]: undefined;
  [Routes.ANIMES]: undefined;
  [Routes.ANIME_DETAIL]: { animeDetail: AnimeDetail.Detail };
};

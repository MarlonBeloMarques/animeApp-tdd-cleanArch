import { Routes } from '~/main/navigation';
import { AnimeDetail } from '~/domain/useCases';

declare global {
  namespace Modules {
    export { Routes, AnimeDetail };
  }
  namespace ReactNavigation {
    interface RootParamList {
      AUTHENTICATION: string;
      ANIMES: string;
      ANIME_DETAIL: string;
    }
  }
}

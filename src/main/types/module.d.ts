import { Routes } from '~/main/navigation';

declare global {
  namespace Modules {
    export { Routes };
  }
  namespace ReactNavigation {
    interface RootParamList {
      AUTHENTICATION: string;
      ANIMES: string;
    }
  }
}

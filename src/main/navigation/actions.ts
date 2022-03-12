import {
  CommonActions,
  NavigationContainerRef,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Routes } from './routes';

type RouteParams = Record<string, any>;
let navigator: NavigationContainerRef<any>;

const setTopLevelNavigator = (
  navigatorRef: NavigationContainerRef<any>,
): void => {
  navigator = navigatorRef;
};

const navigate = (
  routeName: keyof typeof Routes,
  params?: RouteParams,
): void => {
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
};

export { navigate, useNavigation, setTopLevelNavigator, useRoute };

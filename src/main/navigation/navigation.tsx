import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
  Theme,
} from '@react-navigation/native';
import { getTheme } from '~/presentation/helpers';
import StackNavigation from './stack';

type Props = {
  setNavigationTop: (navigatorRef: NavigationContainerRef<any>) => void;
};

const primary = getTheme('primary');
const text = getTheme('text');

const contextTheme: Theme = {
  dark: false,
  colors: {
    primary: primary,
    background: primary,
    card: primary,
    text: text,
    border: primary,
    notification: primary,
  },
};

const Navigation: React.FC<Props> = ({ setNavigationTop }) => {
  return (
    <NavigationContainer ref={setNavigationTop} theme={contextTheme}>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default Navigation;

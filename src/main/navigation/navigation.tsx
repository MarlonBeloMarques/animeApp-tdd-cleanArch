import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { contextTheme } from '../helpers';
import StackNavigation from './stack';

type Props = {
  setNavigationTop: (navigatorRef: NavigationContainerRef<any>) => void;
};

const Navigation: React.FC<Props> = ({ setNavigationTop }) => {
  return (
    <NavigationContainer ref={setNavigationTop} theme={contextTheme}>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default Navigation;

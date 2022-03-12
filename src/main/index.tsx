import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainerRef } from '@react-navigation/native';
import { Navigation, NavigationActions } from '~/main/navigation';

const Main: React.FC = () => {
  return (
    <WrapperScreen>
      <StatusBar barStyle="light-content" />
      <Navigation
        setNavigationTop={(navigationRef: NavigationContainerRef<any>) =>
          NavigationActions.setTopLevelNavigator(navigationRef)
        }
      />
    </WrapperScreen>
  );
};

const WrapperScreen = styled.View`
  flex: 1;
`;

export default Main;

import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { getTheme } from '~/presentation/helpers';
import { Authentication } from '~/presentation/screens';

const Main: React.FC = () => {
  return (
    <WrapperScreen>
      <StatusBar barStyle="light-content" />
      <Authentication redirectUrl="https://api.aniapi.com/v1/oauth" />
    </WrapperScreen>
  );
};

const WrapperScreen = styled.View`
  flex: 1;
  background-color: ${getTheme('primary')};
`;

export default Main;

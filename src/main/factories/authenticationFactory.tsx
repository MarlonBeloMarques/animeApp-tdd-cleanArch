import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Authentication } from '~/presentation/screens';
import { Routes } from '~/main/navigation';
import { OAuthAdapter } from '~/infra/oauth';
import { RemoteAuthentication } from '~/data/useCases';

const redirectUrl = 'https://api.aniapi.com/v1/oauth';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const AuthenticationFactory: React.FC<Props> = () => {
  const oAuthAdapter = new OAuthAdapter();
  const remoteAuthentication = new RemoteAuthentication(
    redirectUrl,
    oAuthAdapter,
  );
  return <Authentication remoteAuthentication={remoteAuthentication} />;
};

export default AuthenticationFactory;

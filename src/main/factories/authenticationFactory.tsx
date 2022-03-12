import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Authentication } from '~/presentation/screens';
import { Routes } from '~/main/navigation';

const redirectUrl = 'https://api.aniapi.com/v1/oauth';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const AuthenticationFactory: React.FC<Props> = () => {
  return <Authentication redirectUrl={redirectUrl} />;
};

export default AuthenticationFactory;

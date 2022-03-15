import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Authentication } from '~/presentation/screens';
import { Routes } from '~/main/navigation';
import { remoteAuthenticationFactory } from '../data';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const AuthenticationFactory: React.FC<Props> = () => {
  return (
    <Authentication remoteAuthentication={remoteAuthenticationFactory()} />
  );
};

export default AuthenticationFactory;

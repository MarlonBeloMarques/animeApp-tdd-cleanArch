import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Animes } from '~/presentation/screens';
import { Routes } from '~/main/navigation';

const url = 'https://api.aniapi.com/v1/anime';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const AuthenticationFactory: React.FC<Props> = () => {
  return <Animes url={url} onEndReachedThreshold={20} />;
};

export default AuthenticationFactory;

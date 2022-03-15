import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Animes } from '~/presentation/screens';
import { Routes } from '~/main/navigation';
import { remoteAnimeListFactory } from '../data';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const AuthenticationFactory: React.FC<Props> = () => {
  return (
    <Animes
      remoteAnimeList={remoteAnimeListFactory()}
      onEndReachedThreshold={20}
    />
  );
};

export default AuthenticationFactory;

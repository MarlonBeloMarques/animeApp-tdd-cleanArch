import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Animes } from '~/presentation/screens';
import { Routes } from '~/main/navigation';
import { AxiosAdapter } from '~/infra/http';
import { RemoteAnimeList } from '~/data/useCases';

const url = 'https://api.aniapi.com/v1/anime';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const AuthenticationFactory: React.FC<Props> = () => {
  const axiosAdapter = new AxiosAdapter();
  const remoteAnimeList = new RemoteAnimeList(url, axiosAdapter);
  return (
    <Animes remoteAnimeList={remoteAnimeList} onEndReachedThreshold={20} />
  );
};

export default AuthenticationFactory;

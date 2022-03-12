import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { NavigationActions, Routes } from '~/main/navigation';
import AnimeDetail from './animeDetail';

const AnimeDetailContainer: React.FC = () => {
  const {
    params: { animeDetail },
  } = NavigationActions.useRoute<RouteProp<StackParams, Routes.ANIME_DETAIL>>();
  return <AnimeDetail animeDetail={animeDetail} />;
};

export default AnimeDetailContainer;

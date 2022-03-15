import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { AnimeDetail } from '~/presentation/screens';
import { Routes } from '~/main/navigation';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const AnimeDetailFactory: React.FC<Props> = () => {
  return <AnimeDetail />;
};

export default AnimeDetailFactory;

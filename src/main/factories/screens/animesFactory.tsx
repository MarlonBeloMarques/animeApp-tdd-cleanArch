import React from 'react';
import { NativeScrollEvent } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Animes } from '~/presentation/screens';
import { Routes } from '~/main/navigation';
import { remoteAnimeListFactory } from '../data';

export const onEndReached = (
  onEndReachedThreshold: number,
  waitForEndReached: boolean,
  { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent,
) => {
  if (waitForEndReached) {
    return false;
  }

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - onEndReachedThreshold
  );
};

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const AuthenticationFactory: React.FC<Props> = () => {
  return (
    <Animes
      remoteAnimeList={remoteAnimeListFactory()}
      onEndReachedThreshold={20}
      onEndReached={onEndReached}
    />
  );
};

export default AuthenticationFactory;

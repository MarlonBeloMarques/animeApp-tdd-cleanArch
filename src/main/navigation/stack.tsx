import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AnimeDetailFactory,
  AnimesFactory,
  AuthenticationFactory,
} from '~/main/factories';
import { Routes } from './routes';

const Stack = createNativeStackNavigator<StackParams>();

const StackNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.AUTHENTICATION}
      screenOptions={{
        headerTransparent: true,
        headerBackTitleVisible: false,
        title: '',
      }}
    >
      <Stack.Screen name={Routes.AUTHENTICATION}>
        {(props) => <AuthenticationFactory {...props} />}
      </Stack.Screen>
      <Stack.Screen name={Routes.ANIMES}>
        {(props) => <AnimesFactory {...props} />}
      </Stack.Screen>
      <Stack.Screen name={Routes.ANIME_DETAIL}>
        {(props) => <AnimeDetailFactory {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigation;

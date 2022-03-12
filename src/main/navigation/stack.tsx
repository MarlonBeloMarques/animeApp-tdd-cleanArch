import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Authentication } from '~/presentation/screens';
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
      <Stack.Screen name={Routes.AUTHENTICATION} component={Authentication} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

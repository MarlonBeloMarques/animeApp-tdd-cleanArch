import React from 'react';
import { Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { RemoteAuthentication } from '~/data/useCases';
import { OAuthAdapter } from '~/infra/oauth';
import { NavigationActions, Routes } from '~/main/navigation';
import Authentication from './authentication';

type Props = {
  redirectUrl: string;
};

const AuthenticationContainer: React.FC<Props> = ({ redirectUrl }) => {
  const onPressAuthentication = async () => {
    Alert.alert('Authentication', 'do you want to authenticate?', [
      {
        text: 'Yes',
        style: 'default',
        onPress: async () => await redirectAuthentication(),
      },
      {
        text: 'No',
        style: 'destructive',
        onPress: () => navigateToAnimes(),
      },
    ]);
  };

  const navigateToAnimes = () => {
    NavigationActions.navigate(Routes.ANIMES);
  };

  const redirectAuthentication = async () => {
    try {
      const oauthAdapter = new OAuthAdapter();
      const remoteAuthentication = new RemoteAuthentication(
        redirectUrl,
        oauthAdapter,
      );
      await remoteAuthentication.authenticate();
    } catch (error) {
      showMessage({
        message: 'Something went wrong opening the link. Try again later.',
        type: 'warning',
      });
    }
  };

  return <Authentication onPressAuthentication={onPressAuthentication} />;
};

export default AuthenticationContainer;

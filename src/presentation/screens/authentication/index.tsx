import React from 'react';
import { showMessage } from 'react-native-flash-message';
import { OAuthAdapter } from '~/infra/oauth';
import Authentication from './authentication';

type Props = {
  redirectUrl: string;
};

const AuthenticationContainer: React.FC<Props> = ({ redirectUrl }) => {
  const onPressAuthentication = async () => {
    try {
      const oauthAdapter = new OAuthAdapter();
      await oauthAdapter.redirect({
        url: redirectUrl,
      });
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

import React from 'react';
import { OAuthAdapter } from '~/infra/oauth';
import Authentication from './authentication';

const AuthenticationContainer: React.FC = () => {
  const onPressAuthentication = async () => {
    const oauthAdapter = new OAuthAdapter();
    const redirectUrl = 'https://api.aniapi.com/v1/oauth';
    await oauthAdapter.redirect({
      url: redirectUrl,
    });
  };

  return <Authentication onPressAuthentication={onPressAuthentication} />;
};

export default AuthenticationContainer;

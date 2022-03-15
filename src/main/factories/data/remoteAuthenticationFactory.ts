import { RemoteAuthentication } from '~/data/useCases';
import { Authentication } from '~/domain/useCases';
import { OAuthAdapter } from '~/infra/oauth';

const remoteAuthenticationFactory = (): Authentication => {
  const redirectUrl = 'https://api.aniapi.com/v1/oauth';
  const oAuthAdapter = new OAuthAdapter();
  return new RemoteAuthentication(redirectUrl, oAuthAdapter);
};

export default remoteAuthenticationFactory;

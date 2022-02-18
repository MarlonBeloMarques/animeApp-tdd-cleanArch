import { Linking } from 'react-native';
import { OAuthClient } from '~/data/oauth';

export class OAuthAdapter implements OAuthClient {
  async redirect(data: OAuthClient.Request): Promise<void> {
    await Linking.openURL(data.url);
  }
}

import { Linking } from 'react-native';
import { OAuthClient } from '~/data/oauth';
import { makeUrl } from '../../data/helpers/testFactories';

jest.mock('react-native/Libraries/Linking/Linking');

const mockLinking = () => {
  const mockedLinking = Linking as jest.Mocked<typeof Linking>;
  mockedLinking.openURL.mockResolvedValue('mockResolved');
  return mockedLinking;
};

describe('Data: OAuthAdapter', () => {
  test('should request to openUrl once successfully', () => {
    const mockedLinking = mockLinking();
    const sut = new OAuthAdapter();
    sut.redirect({ url: makeUrl() });
    expect(mockedLinking.openURL).toHaveBeenCalledTimes(1);
  });
});

export class OAuthAdapter implements OAuthClient {
  async redirect(data: OAuthClient.Request): Promise<void> {
    await Linking.openURL(data.url);
  }
}

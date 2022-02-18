import { OAuthAdapter } from '~/infra/oauth';
import { makeUrl } from '../../data/helpers/testFactories';
import { mockLinking } from '../mocks/linkingMock';

jest.mock('react-native/Libraries/Linking/Linking');

describe('Data: OAuthAdapter', () => {
  test('should request to openUrl once successfully', () => {
    const mockedLinking = mockLinking();
    const sut = new OAuthAdapter();
    sut.redirect({ url: makeUrl() });
    expect(mockedLinking.openURL).toHaveBeenCalledTimes(1);
  });
});

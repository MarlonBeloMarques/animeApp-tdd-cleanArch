import { Linking } from 'react-native';
import { OAuthAdapter } from '~/infra/oauth';
import { makeUrl } from '../../data/helpers/testFactories';
import { mockLinking } from '../mocks/linkingMock';

jest.mock('react-native/Libraries/Linking/Linking');

describe('Data: OAuthAdapter', () => {
  test('should request to openUrl once successfully', () => {
    const [sut, mockedLinking] = makeSut();
    sut.redirect({ url: makeUrl() });
    expect(mockedLinking.openURL).toHaveBeenCalledTimes(1);
  });
});

const makeSut = (): [OAuthAdapter, jest.Mocked<Linking>] => {
  const mockedLinking = mockLinking();
  const sut = new OAuthAdapter();
  return [sut, mockedLinking];
};

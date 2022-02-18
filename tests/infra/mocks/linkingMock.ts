import { Linking } from 'react-native';

export const mockLinking = (): jest.Mocked<Linking> => {
  const mockedLinking = Linking as jest.Mocked<typeof Linking>;
  mockedLinking.openURL.mockResolvedValue('mockResolved');
  return mockedLinking;
};

import { fireEvent, render } from '@testing-library/react-native';
import { Authentication } from '~/presentation/screens';
import { mockLinking } from '../../infra/mocks/linkingMock';
import { renderWithParams } from '../../ui/helpers';

describe('Presentation: Authentication', () => {
  test('should call the redirect with success with OAuthAdapter', () => {
    const mockedLinking = mockLinking();
    const { getByTestId } = render(
      renderWithParams({
        screen: Authentication,
        screenProps: {},
      }),
    );

    const button = getByTestId('authentication_id');
    fireEvent.press(button);
    expect(mockedLinking.openURL).toHaveBeenCalledTimes(1);
  });
});

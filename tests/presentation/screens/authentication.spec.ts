import * as FlashMessage from 'react-native-flash-message';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Authentication } from '~/presentation/screens';
import { mockLinking } from '../../infra/mocks/linkingMock';
import { renderWithParams } from '../../ui/helpers';

describe('Presentation: Authentication', () => {
  test('should call the redirect with success with OAuthAdapter', () => {
    const { getByTestId, mockedLinking } = makeSut();
    const button = getByTestId('authentication_id');
    fireEvent.press(button);
    expect(mockedLinking.openURL).toHaveBeenCalledTimes(1);
  });

  test('should find the flesh message alert', () => {
    const { getByTestId } = makeSut();
    const flashMessage = getByTestId('flash_message_id');
    expect(flashMessage).toBeTruthy();
  });

  test('should call the flesh message alert', async () => {
    const { getByTestId, mockedLinking } = makeSut();
    mockedLinking.openURL.mockClear().mockRejectedValueOnce(() => {
      return new Error('some error reason');
    });

    const spy = jest.spyOn(FlashMessage, 'showMessage');

    await waitFor(() => {
      fireEvent.press(getByTestId('authentication_id'));
      expect(spy).toHaveBeenCalledWith({
        message: 'Something went wrong opening the link. Try again later.',
        type: 'warning',
      });
    });
  });
});

const makeSut = () => {
  const mockedLinking = mockLinking();
  const { getByTestId } = render(
    renderWithParams({
      screen: Authentication,
      screenProps: { redirectUrl: 'https://www.google.com' },
    }),
  );

  return { getByTestId, mockedLinking };
};

import * as FlashMessage from 'react-native-flash-message';
import { Alert } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Authentication } from '~/presentation/screens';
import { NavigationActions, Routes } from '~/main/navigation';
import { RemoteAuthentication } from '~/data/useCases';
import { OAuthAdapter } from '~/infra/oauth';
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

  test('should not call alert', () => {
    const { alertSpy } = makeSut(false);
    expect(alertSpy).not.toHaveBeenCalled();
  });

  test('should when calling the alert and clicking no, call navigate to animes', () => {
    const navigateSpy = jest.spyOn(NavigationActions, 'navigate');
    const { getByTestId } = makeSut(false);
    const button = getByTestId('authentication_id');
    fireEvent.press(button);

    expect(navigateSpy).toHaveBeenCalledWith(Routes.ANIMES);
  });
});

const makeSut = (pressAlertWithSuccess = true) => {
  const mockedLinking = mockLinking();
  const alertSpy = jest
    .spyOn(Alert, 'alert')
    .mockImplementation((title, message, callbackOrButtons) => {
      if (pressAlertWithSuccess) {
        if (callbackOrButtons && callbackOrButtons[0].onPress) {
          callbackOrButtons[0].onPress();
        }
      } else {
        if (callbackOrButtons && callbackOrButtons[1].onPress) {
          callbackOrButtons[1].onPress();
        }
      }
    })
    .mockClear();

  const oAuthAdapter = new OAuthAdapter();
  const remoteAuthentication = new RemoteAuthentication(
    'https://www.google.com',
    oAuthAdapter,
  );

  const { getByTestId } = render(
    renderWithParams({
      screen: Authentication,
      screenProps: { remoteAuthentication: remoteAuthentication },
    }),
  );

  return { getByTestId, mockedLinking, alertSpy };
};

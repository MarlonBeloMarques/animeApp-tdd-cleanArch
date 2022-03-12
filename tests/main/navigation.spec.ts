import { CommonActions } from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationActions, Routes } from '~/main/navigation';
import Main from '~/main';
import { renderWithParams } from '../ui/helpers';

describe('Main: Navigation', () => {
  test('should call navigate actions with success', async () => {
    const setTopLevelNavigatorSpy = jest.spyOn(
      NavigationActions,
      'setTopLevelNavigator',
    );
    const navigateSpy = jest.spyOn(CommonActions, 'navigate');

    render(
      renderWithParams({
        screen: Main,
      }),
    );

    await waitFor(() => {
      expect(setTopLevelNavigatorSpy).toHaveBeenCalled();
      NavigationActions.navigate(Routes.AUTHENTICATION);
      expect(navigateSpy).toHaveBeenCalledTimes(1);
    });
  });
});

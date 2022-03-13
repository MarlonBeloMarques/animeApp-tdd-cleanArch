import { CommonActions } from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationActions, Routes } from '~/main/navigation';
import Main from '~/main';
import Animes from '~/presentation/screens/animes/animes';
import { RemoteAnimeList } from '~/data/useCases';
import { makeAnimeModel } from '../../data/helpers';
import { renderWithParams } from '../../ui/helpers';

describe('Main: Navigation', () => {
  test('should call navigate actions with success', async () => {
    const navigateSpy = jest.spyOn(CommonActions, 'navigate');
    const { setTopLevelNavigatorSpy } = makeSut();

    await waitFor(() => {
      expect(setTopLevelNavigatorSpy).toHaveBeenCalled();
      NavigationActions.navigate(Routes.AUTHENTICATION);
      expect(navigateSpy).toHaveBeenCalledTimes(1);
    });
  });

  test('should call navigation actions to anime screen successfully', async () => {
    const navigateSpy = jest.spyOn(CommonActions, 'navigate');
    jest
      .spyOn(RemoteAnimeList.prototype, 'list')
      .mockResolvedValueOnce(makeAnimeModel())
      .mockClear();

    const { getByType } = makeSut();

    await waitFor(async () => {
      NavigationActions.navigate(Routes.ANIMES);
      expect(navigateSpy).toHaveBeenCalledWith({
        name: Routes.ANIMES,
        params: undefined,
      });

      const animesLength = getByType(Animes).props.animeList.length;
      expect(animesLength).toBeTruthy();
    });
  });
});

const makeSut = () => {
  const setTopLevelNavigatorSpy = jest.spyOn(
    NavigationActions,
    'setTopLevelNavigator',
  );

  const { UNSAFE_getByType } = render(
    renderWithParams({
      screen: Main,
    }),
  );

  return { setTopLevelNavigatorSpy, getByType: UNSAFE_getByType };
};

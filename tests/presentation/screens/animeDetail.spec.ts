import { CommonActions } from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';
import Main from '~/main';
import { NavigationActions, Routes } from '~/main/navigation';
import AnimeDetailView from '~/presentation/screens/animeDetail/animeDetail';
import { makeAnimeDetail, renderWithParams } from '../../ui/helpers';

describe('Presentation: AnimeDetail', () => {
  test('should passed anime detail via props with success', async () => {
    const mockedAnimeDetail = makeAnimeDetail();
    const navigateSpy = jest.spyOn(CommonActions, 'navigate');

    const { getByType } = makeSut();

    await waitFor(async () => {
      NavigationActions.navigate(Routes.ANIME_DETAIL, {
        animeDetail: mockedAnimeDetail,
      });

      expect(navigateSpy).toHaveBeenCalledWith({
        name: Routes.ANIME_DETAIL,
        params: { animeDetail: mockedAnimeDetail },
      });

      expect(getByType(AnimeDetailView).props.animeDetail).toEqual(
        mockedAnimeDetail,
      );
    });
  });
});

const makeSut = () => {
  const { UNSAFE_getByType } = render(
    renderWithParams({
      screen: Main,
    }),
  );

  return { getByType: UNSAFE_getByType };
};

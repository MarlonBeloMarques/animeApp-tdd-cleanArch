import { render } from '@testing-library/react-native';
import { AnimeDetail } from '~/presentation/screens';
import AnimeDetailView from '~/presentation/screens/animeDetail/animeDetail';
import { makeAnimeDetail, renderWithParams } from '../../ui/helpers';

describe('Presentation: AnimeDetail', () => {
  test('should passed anime detail via props with success', () => {
    const { getByType, mockedAnimeDetail } = makeSut();
    expect(getByType(AnimeDetailView).props.animeDetail).toEqual(
      mockedAnimeDetail,
    );
  });
});

const makeSut = () => {
  const mockedAnimeDetail = makeAnimeDetail();

  const { UNSAFE_getByType } = render(
    renderWithParams({
      screen: AnimeDetail,
      screenProps: { animeDetail: mockedAnimeDetail },
    }),
  );

  return { getByType: UNSAFE_getByType, mockedAnimeDetail };
};

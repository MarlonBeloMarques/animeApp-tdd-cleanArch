import { render, waitFor } from '@testing-library/react-native';
import { AnimeModelDocument } from '~/domain/models';
import { Animes } from '~/presentation/screens';
import AnimesView from '~/presentation/screens/animes/animes';
import { ModelDocumentImageList } from '~/presentation/protocols';
import { renderWithParams } from '../../ui/helpers';

describe('Presentation: Animes', () => {
  test('should hide loading animation after call with success the list RemoteAnimeList', async () => {
    const { getByTestId, UNSAFE_getByType } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          url: 'https://api.aniapi.com/v1/anime',
          onEndReachedThreshold: 20,
        },
      }),
    );

    const loadingStart = getByTestId('loading_id');
    expect(loadingStart).toBeTruthy();

    await waitFor(
      () => {
        const animesView = UNSAFE_getByType(AnimesView);
        expect(animesView.props.animeList.length).toBeTruthy();

        try {
          const loadingEnd = getByTestId('loading_id');
          expect(loadingEnd).toBeTruthy();
          throw new Error('something unexpected occurred in your test');
        } catch (error) {
          if (error instanceof Error) {
            expect(error.message).toEqual(
              'Unable to find an element with testID: loading_id',
            );
          }
        }
      },
      { timeout: 5000 },
    );
  });

  test('should hide loading animation after call with error the list RemoteAnimeList', async () => {
    const { getByTestId, UNSAFE_getByType } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          url: 'api.aniapi.com/v1/anime',
          onEndReachedThreshold: 20,
        },
      }),
    );

    const loadingStart = getByTestId('loading_id');
    expect(loadingStart).toBeTruthy();

    await waitFor(
      () => {
        const animesView = UNSAFE_getByType(AnimesView);
        expect(animesView.props.animeStatusMessage).toEqual(
          'Unexpected error. Please check your internet and try again.',
        );

        try {
          const loadingEnd = getByTestId('loading_id');
          expect(loadingEnd).toBeTruthy();
          throw new Error('something unexpected occurred in your test');
        } catch (error) {
          if (error instanceof Error) {
            expect(error.message).toEqual(
              'Unable to find an element with testID: loading_id',
            );
          }
        }
      },
      { timeout: 1000 },
    );
  });

  test('should show is empty list message after call with error the list RemoteAnimeList', async () => {
    const { getByTestId, UNSAFE_getByType } = render(
      renderWithParams({
        screen: Animes,
        screenProps: { url: 'api.com/v1/anime', onEndReachedThreshold: 20 },
      }),
    );

    await waitFor(
      () => {
        const animesView = UNSAFE_getByType(AnimesView);
        expect(animesView.props.animeStatusMessage).toEqual(
          'Unexpected error. Please check your internet and try again.',
        );

        const animeListIsEmpty = getByTestId('animes_is_empty_id');
        expect(animeListIsEmpty).toBeTruthy();
      },
      { timeout: 1000 },
    );
  });

  test('should show all anime in the list with height and width', async () => {
    const { UNSAFE_getByType } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          url: 'https://api.aniapi.com/v1/anime',
          onEndReachedThreshold: 20,
        },
      }),
    );

    await waitFor(
      () => {
        const animesView = UNSAFE_getByType(AnimesView);
        expect(animesView.props.animeList.length).toBeTruthy();

        animesView.props.animeList.forEach(
          (
            anime: ModelDocumentImageList.ModelDocumentImage<AnimeModelDocument>,
          ) => {
            expect(anime.cover_image_size.height).not.toEqual(0);
            expect(anime.cover_image_size.width).not.toEqual(0);
          },
        );
      },
      { timeout: 2000 },
    );
  });
});

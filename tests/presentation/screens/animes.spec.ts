import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { AnimeModelDocument } from '~/domain/models';
import AnimesView from '~/presentation/screens/animes/animes';
import { ModelDocumentImageList } from '~/presentation/protocols';
import { AnimeDetailToNavigation, RemoteAnimeList } from '~/data/useCases';
import { UnexpectedError } from '~/data/errors';
import Main from '~/main';
import { NavigationActions } from '~/main/navigation';
import { makeAnimeModel } from '../../data/helpers';
import { mockEventData } from '../../ui/mocks';
import { renderWithParams } from '../../ui/helpers';

describe('Presentation: Animes', () => {
  test('should hide loading animation after call with success the list RemoteAnimeList', async () => {
    const { getByTestId, getByType } = makeSut({
      mockResolvedValueOnce: true,
      mockResolvedValue: false,
      mockRejectedValueOnce: false,
      mockRejectedValue: false,
    });

    const loadingStart = getByTestId('loading_id');
    expect(loadingStart).toBeTruthy();

    await waitFor(() => {
      const animesView = getByType(AnimesView);
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
    });
  });

  test('should hide loading animation after call with error the list RemoteAnimeList', async () => {
    const { getByTestId, getByType } = makeSut({
      mockResolvedValueOnce: false,
      mockResolvedValue: false,
      mockRejectedValueOnce: true,
      mockRejectedValue: false,
    });

    const loadingStart = getByTestId('loading_id');
    expect(loadingStart).toBeTruthy();

    await waitFor(() => {
      const animesView = getByType(AnimesView);
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
    });
  });

  test('should show is empty list message after call with error the list RemoteAnimeList', async () => {
    const { getByTestId, getByType } = makeSut({
      mockResolvedValueOnce: false,
      mockResolvedValue: false,
      mockRejectedValueOnce: true,
      mockRejectedValue: false,
    });

    await waitFor(() => {
      const animesView = getByType(AnimesView);
      expect(animesView.props.animeStatusMessage).toEqual(
        'Unexpected error. Please check your internet and try again.',
      );

      const animeListIsEmpty = getByTestId('animes_is_empty_id');
      expect(animeListIsEmpty).toBeTruthy();
    });
  });

  test('should return unexpected error after calling remoteAnimeList list', async () => {
    const { getByType } = makeSut(
      {
        mockResolvedValueOnce: false,
        mockResolvedValue: false,
        mockRejectedValueOnce: false,
        mockRejectedValue: true,
      },
      5,
      true,
    );

    await waitFor(() => {
      const animesView = getByType(AnimesView);
      expect(animesView.props.animeStatusMessage).toEqual(
        new UnexpectedError().message,
      );
    });
  });

  test('should show all anime in the list with height and width', async () => {
    const { getByType } = makeSut({
      mockResolvedValueOnce: true,
      mockResolvedValue: false,
      mockRejectedValueOnce: false,
      mockRejectedValue: false,
    });

    await waitFor(() => {
      const animesView = getByType(AnimesView);
      expect(animesView.props.animeList.length).toBeTruthy();

      animesView.props.animeList.forEach(
        (
          anime: ModelDocumentImageList.ModelDocumentImage<AnimeModelDocument>,
        ) => {
          expect(anime.cover_image_size.height).not.toEqual(0);
          expect(anime.cover_image_size.width).not.toEqual(0);
        },
      );
    });
  });

  test('should update anime list successfully after calling completeWithUrlParam with RemoteAnimeList after reaching end of list', async () => {
    const { getByType, getByTestId } = makeSut(
      {
        mockResolvedValueOnce: false,
        mockResolvedValue: true,
        mockRejectedValueOnce: false,
        mockRejectedValue: false,
      },
      100,
    );

    const animesView = getByType(AnimesView);

    await waitFor(() => {
      const animeListLength = animesView.props.animeList.length;
      expect(animeListLength).toBeTruthy();
      expect(animeListLength).toEqual(100);
      expect(animesView.props.page).toEqual(1);
      expect(animesView.props.waitForEndReached).toEqual(false);
    });

    const animeList = getByTestId('anime_list_id');

    const spyCompleteUrlWithParam = jest
      .spyOn(RemoteAnimeList.prototype, 'completeUrlWithParam')
      .mockClear();

    fireEvent.scroll(
      animeList,
      mockEventData({ contentOffset: { x: 1, y: 500 } }),
    );

    await waitFor(async () => {
      expect(animesView.props.page).toEqual(2);
      expect(animesView.props.waitForEndReached).toEqual(true);
      expect(animesView.props.animeList.length).toEqual(200);
      expect(spyCompleteUrlWithParam).toHaveBeenCalledTimes(1);

      await new Promise((resolve) => setTimeout(resolve, 200));

      expect(animesView.props.waitForEndReached).toEqual(false);
      expect(animesView.props.isLoading).toEqual(false);
    });
  });

  test('should call onEndReached several times when scrolling to validate waitForEndReached successfully', async () => {
    const { getByType, getByTestId } = makeSut(
      {
        mockResolvedValueOnce: false,
        mockResolvedValue: true,
        mockRejectedValueOnce: false,
        mockRejectedValue: false,
      },
      100,
    );

    const animesView = getByType(AnimesView);

    await waitFor(() => {
      const animeListLength = animesView.props.animeList.length;
      expect(animeListLength).toBeTruthy();
      expect(animeListLength).toEqual(100);
      expect(animesView.props.page).toEqual(1);
      expect(animesView.props.waitForEndReached).toEqual(false);
    });

    await waitFor(async () => {
      const animeList = getByTestId('anime_list_id');
      fireEvent.scroll(
        animeList,
        mockEventData({ contentOffset: { x: 1, y: 500 } }),
      );
      expect(animesView.props.waitForEndReached).toEqual(true);

      await new Promise((resolve) => setTimeout(resolve, 200));

      expect(animesView.props.waitForEndReached).toEqual(false);
      expect(animesView.props.isLoading).toEqual(false);
    });
  });

  test('should not call completeWithUrlParam while it is loading', async () => {
    const { getByType, getByTestId } = makeSut({
      mockResolvedValueOnce: true,
      mockResolvedValue: false,
      mockRejectedValueOnce: false,
      mockRejectedValue: false,
    });

    const loadingStart = getByTestId('loading_id');
    expect(loadingStart).toBeTruthy();

    await waitFor(() => {
      const animesView = getByType(AnimesView);
      expect(animesView.props.animeList.length).toBeTruthy();

      const spyCompleteUrlWithParam = jest
        .spyOn(RemoteAnimeList.prototype, 'completeUrlWithParam')
        .mockClear();

      try {
        const loadingEnd = getByTestId('loading_id');
        expect(loadingEnd).toBeTruthy();
        throw new Error('something unexpected occurred in your test');
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toEqual(
            'Unable to find an element with testID: loading_id',
          );

          expect(spyCompleteUrlWithParam).not.toHaveBeenCalled();
        }
      }
    });
  });

  test('should call completeWithUrlParam while it is show message: is empty', async () => {
    const { getByType, getByTestId } = makeSut({
      mockResolvedValueOnce: false,
      mockResolvedValue: false,
      mockRejectedValueOnce: true,
      mockRejectedValue: false,
    });

    await waitFor(() => {
      const animesView = getByType(AnimesView);
      expect(animesView.props.animeStatusMessage).toEqual(
        'Unexpected error. Please check your internet and try again.',
      );

      const spyCompleteUrlWithParam = jest
        .spyOn(RemoteAnimeList.prototype, 'completeUrlWithParam')
        .mockClear();

      const animeListIsEmpty = getByTestId('animes_is_empty_id');
      expect(animeListIsEmpty).toBeTruthy();
      expect(spyCompleteUrlWithParam).not.toHaveBeenCalled();
    });
  });

  test('should press the anime successfully and get the details', async () => {
    const { getByType, getByTestId } = makeSut({
      mockResolvedValueOnce: true,
      mockResolvedValue: false,
      mockRejectedValueOnce: false,
      mockRejectedValue: false,
    });

    const spyGetAnimeDetail = jest
      .spyOn(AnimeDetailToNavigation.prototype, 'get')
      .mockClear();

    await waitFor(() => {
      const animesView = getByType(AnimesView);
      expect(animesView.props.animeList.length).toBeTruthy();
      const firstAnime = animesView.props.animeList[0];
      const animeButton = getByTestId(`anime_button_${firstAnime.id}`);

      fireEvent.press(animeButton);
      expect(spyGetAnimeDetail).toHaveBeenCalledTimes(1);
    });
  });
});

type MakeMockSutParams = {
  mockResolvedValueOnce: boolean;
  mockResolvedValue: boolean;
  mockRejectedValueOnce: boolean;
  mockRejectedValue: boolean;
};

const makeSut = (
  {
    mockResolvedValueOnce,
    mockResolvedValue,
    mockRejectedValueOnce,
    mockRejectedValue,
  }: MakeMockSutParams,
  lengthMakeAnimeModel = 5,
  returnRejectedValueIsUnexpected = false,
) => {
  const mockedRemoteAnimeList = jest.spyOn(RemoteAnimeList.prototype, 'list');

  if (mockResolvedValueOnce)
    mockedRemoteAnimeList
      .mockResolvedValueOnce(makeAnimeModel(lengthMakeAnimeModel))
      .mockClear();

  if (mockResolvedValue)
    mockedRemoteAnimeList
      .mockResolvedValue(makeAnimeModel(lengthMakeAnimeModel))
      .mockClear();

  if (mockRejectedValueOnce)
    mockedRemoteAnimeList
      .mockRejectedValueOnce(
        returnRejectedValueIsUnexpected
          ? Promise.reject(new UnexpectedError())
          : new UnexpectedError(),
      )
      .mockClear();

  if (mockRejectedValue)
    mockedRemoteAnimeList
      .mockRejectedValue(
        returnRejectedValueIsUnexpected
          ? Promise.reject(new UnexpectedError())
          : new UnexpectedError(),
      )
      .mockClear();

  const { getByTestId, UNSAFE_getByType } = render(
    renderWithParams({
      screen: Main,
    }),
  );

  NavigationActions.navigate('ANIMES');

  return { getByTestId, getByType: UNSAFE_getByType };
};

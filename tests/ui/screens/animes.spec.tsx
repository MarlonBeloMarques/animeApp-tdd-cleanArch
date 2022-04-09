import { Image, Text } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import Animes from '~/presentation/screens/animes/animes';
import { ModelDocumentListMapper } from '~/presentation/mappers';
import { generateContentForImage, processImages } from '~/presentation/helpers';
import { AnimeModelDocument } from '~/domain/models';
import { ModelDocumentImageList } from '~/presentation/protocols';
import { renderWithParams } from '../helpers';
import { mockAnimeModelDocument } from '../../data/helpers';
import { mockEventData, mockOnEndReached } from '../mocks';

describe('UI: Animes', () => {
  test('should show message if anime list is empty', () => {
    const { getByTestId } = makeSut({
      addAnimeList: false,
      onPressDetailAnime: false,
      getMoreAnime: false,
      onEndReachedThreshold: 0,
      isLoading: false,
      animeListIsEmpty: true,
    });
    const animesIsEmpty = getByTestId('animes_is_empty_id');
    expect(animesIsEmpty).toBeTruthy();
  });

  test('should list the animes with success', () => {
    const { getByTestId, mockAnimeList } = makeSut({
      addAnimeList: true,
      onPressDetailAnime: false,
      getMoreAnime: false,
      onEndReachedThreshold: 0,
      isLoading: false,
      animeListIsEmpty: false,
    });

    const firstAnime = mockAnimeList[0];
    const anime = getByTestId(`anime_${firstAnime.id}`);
    expect(anime).toBeTruthy();
  });

  test('should list the animes with title and image successfully', () => {
    const { getByTestId, mockAnimeList } = makeSut({
      addAnimeList: true,
      onPressDetailAnime: false,
      getMoreAnime: false,
      onEndReachedThreshold: 0,
      isLoading: false,
      animeListIsEmpty: false,
    });

    const firstAnime = mockAnimeList[0];
    const anime = getByTestId(`anime_${firstAnime.id}`);
    const titleAnime = anime.findByType(Text).props.children;
    const imageAnime = anime.findByType(Image).props.source;

    expect(firstAnime.titles?.en).toEqual(titleAnime);
    expect(firstAnime.cover_image).toEqual(imageAnime.uri);
  });

  test('should press the anime successfully', async () => {
    const { getByTestId, mockAnimeList, onPressAnimeDetailMock } = makeSut({
      addAnimeList: true,
      onPressDetailAnime: true,
      getMoreAnime: false,
      onEndReachedThreshold: 0,
      isLoading: false,
      animeListIsEmpty: false,
    });

    const firstAnime = mockAnimeList[0];
    const animeButton = getByTestId(`anime_button_${firstAnime.id}`);
    fireEvent.press(animeButton);
    expect(onPressAnimeDetailMock).toHaveBeenCalled();
  });

  test('should request more anime when reaching the end of the list', async () => {
    const { getByTestId, getMoreAnimeMock } = makeSut({
      addAnimeList: true,
      onPressDetailAnime: false,
      getMoreAnime: true,
      onEndReachedThreshold: 0,
      isLoading: false,
      animeListIsEmpty: false,
    });

    const mockedEventData = mockEventData({ contentOffset: { x: 1, y: 400 } });
    const animeList = getByTestId('anime_list_id');
    fireEvent.scroll(animeList, mockedEventData);
    expect(getMoreAnimeMock).toHaveBeenCalled();
  });

  test('should not get animes when scrolling without reaching the end', async () => {
    const { getByTestId, getMoreAnimeMock } = makeSut({
      addAnimeList: true,
      onPressDetailAnime: false,
      getMoreAnime: true,
      onEndReachedThreshold: 0,
      isLoading: false,
      animeListIsEmpty: false,
    });

    const mockedEventData = mockEventData({ contentOffset: { x: 1, y: 200 } });
    const animeList = getByTestId('anime_list_id');
    fireEvent.scroll(animeList, mockedEventData);
    expect(getMoreAnimeMock).not.toHaveBeenCalled();
  });

  test('should utilize the onEndReachedThreshold correct', async () => {
    const onEndReachedThreshold = 20;
    const { getByTestId, mockedOnReached } = makeSut({
      addAnimeList: true,
      onPressDetailAnime: false,
      getMoreAnime: true,
      onEndReachedThreshold: onEndReachedThreshold,
      isLoading: false,
      animeListIsEmpty: false,
    });

    const mockedEventData = mockEventData({ contentOffset: { x: 1, y: 400 } });
    const animeList = getByTestId('anime_list_id');
    fireEvent.scroll(animeList, mockedEventData);
    expect(mockedOnReached.mock.calls[0][0]).toEqual(onEndReachedThreshold);
  });

  test('should utilize the onEndReached with params correct', async () => {
    const onEndReachedThreshold = 20;
    const { getByTestId, mockedOnReached } = makeSut({
      addAnimeList: true,
      onPressDetailAnime: false,
      getMoreAnime: true,
      onEndReachedThreshold: onEndReachedThreshold,
      isLoading: false,
      animeListIsEmpty: false,
    });

    const mockedEventData = mockEventData({ contentOffset: { x: 1, y: 400 } });
    const animeList = getByTestId('anime_list_id');
    fireEvent.scroll(animeList, mockedEventData);
    expect(mockedOnReached).toHaveBeenCalledWith(onEndReachedThreshold, {
      layoutMeasurement: mockedEventData.nativeEvent.layoutMeasurement,
      contentOffset: mockedEventData.nativeEvent.contentOffset,
      contentSize: mockedEventData.nativeEvent.contentSize,
    });
  });

  test('should show loading animation if isLoading true', () => {
    const { getByTestId } = makeSut({
      addAnimeList: true,
      onPressDetailAnime: false,
      getMoreAnime: true,
      onEndReachedThreshold: 0,
      isLoading: true,
      animeListIsEmpty: false,
    });
    const loading = getByTestId('loading_id');
    expect(loading).toBeTruthy();
  });

  test('should correctly get the content generated by generateContentForImage', () => {
    const imageContent = { width: 172, maxHeight: 220, minHeight: 110 };
    const sut = generateContentForImage(imageContent);
    expect(sut.width).toEqual(imageContent.width);
    expect(sut.height).toBeLessThanOrEqual(imageContent.maxHeight);
    expect(sut.height).toBeGreaterThanOrEqual(imageContent.minHeight);
    expect(sut.aspectRatio).toBeTruthy();
  });

  test('should get anime list with new image size fields with processImage', () => {
    const modelDocumentList = new ModelDocumentListMapper(
      mockAnimeModelDocument(),
    );
    const sut = makeProcessImage(modelDocumentList);
    const firstAnime = sut[0];
    expect(firstAnime.cover_image_size.height).toBeTruthy();
    expect(firstAnime.cover_image_size.width).toBeTruthy();
  });

  test('should get the same size anime list with processImage', () => {
    const modelDocumentList = new ModelDocumentListMapper(
      mockAnimeModelDocument(),
    );
    const sut = makeProcessImage(modelDocumentList);
    expect(sut.length).toEqual(
      modelDocumentList.toModelDocumentImageList().length,
    );
  });
});

const makeProcessImage = (modelDocumentListMapper: ModelDocumentListMapper) => {
  return processImages({
    animeList: modelDocumentListMapper.toModelDocumentImageList(),
    targetWidth: 172,
    height: {
      maxHeight: 220,
      minHeight: 110,
    },
  });
};

type ParamsMakeSut = {
  addAnimeList: boolean;
  onPressDetailAnime: boolean;
  getMoreAnime: boolean;
  onEndReachedThreshold: number;
  isLoading: boolean;
  animeListIsEmpty: boolean;
};

const makeSut = ({
  addAnimeList,
  onPressDetailAnime,
  getMoreAnime,
  onEndReachedThreshold,
  isLoading,
  animeListIsEmpty,
}: ParamsMakeSut) => {
  const mockedOnReached = mockOnEndReached();
  const onPressAnimeDetailMock = jest.fn();
  const getMoreAnimeMock = jest.fn();
  let mockAnimeList: Array<
    ModelDocumentImageList.ModelDocumentImage<AnimeModelDocument>
  > = [];

  if (addAnimeList) {
    const modelDocumentList = new ModelDocumentListMapper(
      mockAnimeModelDocument(),
    );
    mockAnimeList = modelDocumentList.toModelDocumentImageList();
  }
  const { getByTestId } = render(
    renderWithParams({
      screen: Animes,
      screenProps: {
        animeList: addAnimeList ? mockAnimeList : [],
        onPressDetailAnime: onPressDetailAnime
          ? onPressAnimeDetailMock
          : () => {},
        getMoreAnime: getMoreAnime ? getMoreAnimeMock : () => {},
        onEndReached: mockedOnReached,
        onEndReachedThreshold: onEndReachedThreshold,
        isLoading: isLoading,
        animeStatusMessage: '',
        page: 1,
        waitForEndReached: false,
        animeListIsEmpty: animeListIsEmpty,
      },
    }),
  );

  return {
    getByTestId,
    mockedOnReached,
    onPressAnimeDetailMock,
    mockAnimeList,
    getMoreAnimeMock,
  };
};

import { Image, NativeScrollEvent, Text } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { Animes } from '~/presentation/screens';
import { Anime } from '~/domain/useCases';
import { renderWithParams } from '../helpers';
import { mockAnimeModelDocument } from '../../data/helpers';

describe('Presentation: Animes', () => {
  test('should show message if anime list is empty', () => {
    const mockedOnReached = mockOnEndReached();
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: [],
          onPressDetailAnime: () => {},
          getMoreAnime: () => {},
          onEndReached: mockedOnReached,
        },
      }),
    );
    const animesIsEmpty = getByTestId('animes_is_empty_id');
    expect(animesIsEmpty).toBeTruthy();
  });

  test('should list the animes with success', () => {
    const mockedOnReached = mockOnEndReached();
    const modelDocumentList = new ModelDocumentListMapper(
      mockAnimeModelDocument(),
    );
    const mockAnimeList = modelDocumentList.toModelDocumentImageList();
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: mockAnimeList,
          onPressDetailAnime: () => {},
          getMoreAnime: () => {},
          onEndReached: mockedOnReached,
        },
      }),
    );

    const firstAnime = mockAnimeList[0];
    const anime = getByTestId(`anime_${firstAnime.id}`);
    expect(anime).toBeTruthy();
  });

  test('should list the animes with title and image successfully', () => {
    const mockedOnReached = mockOnEndReached();
    const modelDocumentList = new ModelDocumentListMapper(
      mockAnimeModelDocument(),
    );
    const mockAnimeList = modelDocumentList.toModelDocumentImageList();
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: mockAnimeList,
          onPressDetailAnime: () => {},
          getMoreAnime: () => {},
          onEndReached: mockedOnReached,
        },
      }),
    );

    const firstAnime = mockAnimeList[0];
    const anime = getByTestId(`anime_${firstAnime.id}`);
    const titleAnime = anime.findByType(Text).props.children;
    const imageAnime = anime.findByType(Image).props.source;

    expect(firstAnime.titles?.en).toEqual(titleAnime);
    expect(firstAnime.cover_image).toEqual(imageAnime.uri);
  });

  test('should press the anime successfully', async () => {
    const mockedOnReached = mockOnEndReached();
    const onPressAnimeDetailMock = jest.fn();
    const modelDocumentList = new ModelDocumentListMapper(
      mockAnimeModelDocument(),
    );
    const mockAnimeList = modelDocumentList.toModelDocumentImageList();
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: mockAnimeList,
          onPressDetailAnime: onPressAnimeDetailMock,
          getMoreAnime: () => {},
          onEndReached: mockedOnReached,
        },
      }),
    );

    const firstAnime = mockAnimeList[0];
    const animeButton = getByTestId(`anime_button_${firstAnime.id}`);
    fireEvent.press(animeButton);
    expect(onPressAnimeDetailMock).toHaveBeenCalled();
  });

  test('should request more anime when reaching the end of the list', async () => {
    const getMoreAnimeMock = jest.fn();
    const mockedOnReached = mockOnEndReached();
    const modelDocumentList = new ModelDocumentListMapper(
      mockAnimeModelDocument(),
    );

    const mockAnimeList = modelDocumentList.toModelDocumentImageList();
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: mockAnimeList,
          onPressDetailAnime: () => {},
          getMoreAnime: getMoreAnimeMock,
          onEndReached: mockedOnReached,
        },
      }),
    );

    const mockedEventData = mockEventData({ contentOffset: { x: 1, y: 400 } });
    const animeList = getByTestId('anime_list_id');
    fireEvent.scroll(animeList, mockedEventData);
    expect(getMoreAnimeMock).toHaveBeenCalled();
  });

  test('should not get animes when scrolling without reaching the end', async () => {
    const mockedOnReached = mockOnEndReached();
    const getMoreAnimeMock = jest.fn();
    const modelDocumentList = new ModelDocumentListMapper(
      mockAnimeModelDocument(),
    );
    const mockAnimeList = modelDocumentList.toModelDocumentImageList();

    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: mockAnimeList,
          onPressDetailAnime: () => {},
          getMoreAnime: getMoreAnimeMock,
          onEndReached: mockedOnReached,
        },
      }),
    );

    const mockedEventData = mockEventData({ contentOffset: { x: 1, y: 200 } });
    const animeList = getByTestId('anime_list_id');
    fireEvent.scroll(animeList, mockedEventData);
    expect(getMoreAnimeMock).not.toHaveBeenCalled();
  });

  test('should utilize the onEndReachedThreshold correct', async () => {
    const mockedOnReached = mockOnEndReached();
    const onEndReachedThreshold = 20;

    const modelDocumentList = new ModelDocumentListMapper(
      mockAnimeModelDocument(),
    );
    const mockAnimeList = modelDocumentList.toModelDocumentImageList();
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: mockAnimeList,
          onPressDetailAnime: () => {},
          getMoreAnime: () => {},
          onEndReached: mockedOnReached,
          onEndReachedThreshold: onEndReachedThreshold,
        },
      }),
    );

    const mockedEventData = mockEventData({ contentOffset: { x: 1, y: 400 } });
    const animeList = getByTestId('anime_list_id');
    fireEvent.scroll(animeList, mockedEventData);
    expect(mockedOnReached.mock.calls[0][0]).toEqual(onEndReachedThreshold);
  });

  test('should utilize the onEndReached with params correct', async () => {
    const mockedOnReached = mockOnEndReached();
    const onEndReachedThreshold = 20;

    const modelDocumentList = new ModelDocumentListMapper(
      mockAnimeModelDocument(),
    );
    const mockAnimeList = modelDocumentList.toModelDocumentImageList();
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: mockAnimeList,
          onPressDetailAnime: () => {},
          getMoreAnime: () => {},
          onEndReached: mockedOnReached,
          onEndReachedThreshold: onEndReachedThreshold,
        },
      }),
    );

    const mockedEventData = mockEventData({ contentOffset: { x: 1, y: 400 } });
    const animeList = getByTestId('anime_list_id');
    fireEvent.scroll(animeList, mockedEventData);
    expect(mockedOnReached).toHaveBeenCalledWith(onEndReachedThreshold, {
      layoutMeasurement: mockedEventData.nativeEvent.layoutMeasurement,
      contentOffset: mockedEventData.nativeEvent.contentOffset,
      contentSize: mockedEventData.nativeEvent.contentSize,
    });
  });

  test('should correctly get the content generated by generateContentForImage', () => {
    const width = 172;
    const maxHeight = 220;
    const minHeight = 110;
    const sut = generateContentForImage({ width, maxHeight, minHeight });
    expect(sut.width).toEqual(width);
    expect(sut.height).toBeLessThanOrEqual(maxHeight);
    expect(sut.height).toBeGreaterThanOrEqual(minHeight);
    expect(sut.aspectRatio).toBeTruthy();
  });

  test('should get anime list with new image size fields with processImage', () => {
    const modelDocumentList = new ModelDocumentListMapper(
      mockAnimeModelDocument(),
    );
    const sut = processImages({
      animeList: modelDocumentList.toModelDocumentImageList(),
      targetWidth: 172,
      height: {
        maxHeight: 220,
        minHeight: 110,
      },
    });
    const firstAnime = sut[0];
    expect(firstAnime.cover_image_size.height).toBeTruthy();
    expect(firstAnime.cover_image_size.width).toBeTruthy();
  });

  test('should get the same size anime list with processImage', () => {
    const modelDocumentList = new ModelDocumentListMapper(
      mockAnimeModelDocument(),
    );
    const sut = processImages({
      animeList: modelDocumentList.toModelDocumentImageList(),
      targetWidth: 172,
      height: {
        maxHeight: 220,
        minHeight: 110,
      },
    });
    expect(sut.length).toEqual(
      modelDocumentList.toModelDocumentImageList().length,
    );
  });
});

type CoverImageSize = {
  width: number;
  height: number;
};

type ModelDocumentImage<T> = Partial<T> & {
  cover_image_size: CoverImageSize;
};

type ProcessImagesParams = {
  animeList: Array<ModelDocumentImage<Anime.ModelDocument>>;
  targetWidth: number;
  height: {
    maxHeight: number;
    minHeight: number;
  };
};

interface ModelDocumentImageList {
  toModelDocumentImageList(): Array<ModelDocumentImage<Anime.ModelDocument>>;
}

class ModelDocumentListMapper implements ModelDocumentImageList {
  constructor(private modelDocumentList: Array<Anime.ModelDocument>) {}

  toModelDocumentImageList = (): Array<
    ModelDocumentImage<Anime.ModelDocument>
  > => {
    const modelDocumentImageList: Array<
      ModelDocumentImage<Anime.ModelDocument>
    > = [];

    this.modelDocumentList.map((modelDocument) => {
      modelDocumentImageList.push(this.toModelDocumentImage(modelDocument));
    });

    return modelDocumentImageList;
  };

  private toModelDocumentImage = (
    modelDocument: Anime.ModelDocument,
  ): ModelDocumentImage<Anime.ModelDocument> => {
    return {
      titles: modelDocument.titles,
      cover_image_size: { height: 0, width: 0 },
      banner_image: modelDocument.banner_image,
      cover_image: modelDocument.cover_image,
      descriptions: modelDocument.descriptions,
      episodes_count: modelDocument.episodes_count,
      genres: modelDocument.genres,
      id: modelDocument.id,
      start_date: modelDocument.start_date,
    };
  };
}

const processImages = ({
  animeList,
  targetWidth,
  height,
}: ProcessImagesParams): Array<ModelDocumentImage<Anime.ModelDocument>> => {
  animeList.map((anime) => {
    const { aspectRatio, width } = generateContentForImage({
      width: targetWidth,
      maxHeight: height.maxHeight,
      minHeight: height.minHeight,
    });
    anime.cover_image_size.width = width;
    anime.cover_image_size.height = targetWidth * aspectRatio;
    return anime;
  });

  return animeList;
};

type ContentImage = {
  width: number;
  height: number;
  aspectRatio: number;
};

type generateContentForImageParams = {
  width: number;
  maxHeight: number;
  minHeight: number;
};

const generateContentForImage = ({
  width,
  maxHeight,
  minHeight,
}: generateContentForImageParams): ContentImage => {
  const height = Math.random() * (maxHeight - minHeight) + minHeight;
  return {
    height: height,
    width: width,
    aspectRatio: width / height,
  };
};

type EventDataParams = {
  contentOffset: {
    x: number;
    y: number;
  };
};

const mockOnEndReached = () => {
  const mockedOnEndReached = jest
    .fn()
    .mockImplementation(
      (
        onEndReachedThreshold: number,
        { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent,
      ) => {
        return (
          layoutMeasurement.height + contentOffset.y >=
          contentSize.height - onEndReachedThreshold
        );
      },
    );

  return mockedOnEndReached;
};

const mockEventData = (params: EventDataParams) => {
  return {
    nativeEvent: {
      contentOffset: params.contentOffset,
      contentSize: {
        height: 500,
        width: 100,
      },
      layoutMeasurement: {
        height: 100,
        width: 100,
      },
    },
  };
};

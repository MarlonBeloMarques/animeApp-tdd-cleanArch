import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { Anime } from '~/domain/useCases';
import { renderWithParams } from '../helpers';
import { mockAnimeModelDocument } from '../../data/helpers';

describe('Presentation: Animes', () => {
  test('should show message if anime list is empty', () => {
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: [],
          onPressDetailAnime: () => {},
          getMoreAnime: () => {},
        },
      }),
    );
    const animesIsEmpty = getByTestId('animes_is_empty_id');
    expect(animesIsEmpty).toBeTruthy();
  });

  test('should list the animes with success', () => {
    const mockAnimeList = mockAnimeModelDocument();
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: mockAnimeList,
          onPressDetailAnime: () => {},
          getMoreAnime: () => {},
        },
      }),
    );

    const firstAnime = mockAnimeList[0];
    const anime = getByTestId(`anime_${firstAnime.id}`);
    expect(anime).toBeTruthy();
  });

  test('should list the animes with title and image successfully', () => {
    const mockAnimeList = mockAnimeModelDocument();
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: mockAnimeList,
          onPressDetailAnime: () => {},
          getMoreAnime: () => {},
        },
      }),
    );

    const firstAnime = mockAnimeList[0];
    const anime = getByTestId(`anime_${firstAnime.id}`);
    const titleAnime = anime.findByType(Text).props.children;
    const imageAnime = anime.findByType(Image).props.source;

    expect(firstAnime.titles.en).toEqual(titleAnime);
    expect(firstAnime.cover_image).toEqual(imageAnime.uri);
  });

  test('should press the anime successfully', async () => {
    const onPressAnimeDetailMock = jest.fn();
    const mockAnimeList = mockAnimeModelDocument();
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: mockAnimeList,
          onPressDetailAnime: onPressAnimeDetailMock,
          getMoreAnime: () => {},
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
    const mockAnimeList = mockAnimeModelDocument();
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: mockAnimeList,
          onPressDetailAnime: () => {},
          getMoreAnime: getMoreAnimeMock,
        },
      }),
    );

    const mockedEventData = mockEventData({ contentOffset: { x: 1, y: 400 } });
    const animeList = getByTestId('anime_list_id');
    fireEvent.scroll(animeList, mockedEventData);
    expect(getMoreAnimeMock).toHaveBeenCalled();
  });

  test('should not get animes when scrolling without reaching the end', async () => {
    const getMoreAnimeMock = jest.fn();
    const mockAnimeList = mockAnimeModelDocument();
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: {
          animeList: mockAnimeList,
          onPressDetailAnime: () => {},
          getMoreAnime: getMoreAnimeMock,
        },
      }),
    );

    const mockedEventData = mockEventData({ contentOffset: { x: 1, y: 200 } });
    const animeList = getByTestId('anime_list_id');
    fireEvent.scroll(animeList, mockedEventData);
    expect(getMoreAnimeMock).not.toHaveBeenCalled();
  });
});

type EventDataParams = {
  contentOffset: {
    x: number;
    y: number;
  };
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

type Props = {
  animeList: Array<Anime.ModelDocument>;
  onPressDetailAnime: () => void;
  getMoreAnime: () => void;
  onEndReachedThreshold?: number;
};

const Animes: React.FC<Props> = ({
  animeList = [],
  onPressDetailAnime,
  getMoreAnime,
  onEndReachedThreshold = 0.5,
}) => {
  return (
    <View>
      <FlatList
        testID="anime_list_id"
        data={animeList}
        renderItem={({ item }) => (
          <View testID={`anime_${item.id}`}>
            <TouchableOpacity
              testID={`anime_button_${item.id}`}
              onPress={onPressDetailAnime}
            >
              <Image source={{ uri: item.cover_image }} />
              <Text>{item.titles.en}</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text testID="animes_is_empty_id">
            {`We couldn't find any anime to show you. Try again later.`}
          </Text>
        }
        onEndReached={getMoreAnime}
        onEndReachedThreshold={onEndReachedThreshold}
      />
    </View>
  );
};

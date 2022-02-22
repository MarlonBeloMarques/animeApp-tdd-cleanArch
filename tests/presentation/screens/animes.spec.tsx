import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { Anime } from '~/domain/useCases';
import { renderWithParams } from '../helpers';
import { mockAnimeModelDocument } from '../../data/helpers';

describe('Presentation: Animes', () => {
  test('should show message if anime list is empty', () => {
    const { getByTestId } = render(
      renderWithParams({
        screen: Animes,
        screenProps: { animeList: [] },
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
        screenProps: { animeList: mockAnimeList },
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
        screenProps: { animeList: mockAnimeList },
      }),
    );

    const firstAnime = mockAnimeList[0];
    const anime = getByTestId(`anime_${firstAnime.id}`);
    const titleAnime = anime.findByType(Text).props.children;
    const imageAnime = anime.findByType(Image).props.source;

    expect(firstAnime.titles.en).toEqual(titleAnime);
    expect(firstAnime.cover_image).toEqual(imageAnime.uri);
  });
});

type Props = {
  animeList: Array<Anime.ModelDocument>;
};

const Animes: React.FC<Props> = ({ animeList = [] }) => {
  return (
    <View>
      <FlatList
        data={animeList}
        renderItem={({ item }) => (
          <View testID={`anime_${item.id}`}>
            <Image source={{ uri: item.cover_image }} />
            <Text>{item.titles.en}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text testID="animes_is_empty_id">
            {`We couldn't find any anime to show you. Try again later.`}
          </Text>
        }
      />
    </View>
  );
};

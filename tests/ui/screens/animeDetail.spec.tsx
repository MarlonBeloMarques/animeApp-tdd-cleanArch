import React from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import faker from 'faker';
import { render } from '@testing-library/react-native';
import { AnimeDetail } from '~/domain/useCases';
import { renderWithParams } from '../helpers';

const { width } = Dimensions.get('screen');

describe('UI: AnimeDetail', () => {
  test('should show image with success', () => {
    const animeDetail = makeAnimeDetail();
    const { getByTestId } = render(
      renderWithParams({
        screen: AnimeDetailContainer,
        screenProps: { animeDetail: animeDetail },
      }),
    );

    const animeImage = getByTestId('anime_image_id');
    expect(animeImage).toBeTruthy();
    expect(animeImage.props.width).toBeTruthy();
    expect(animeImage.props.height).toBeTruthy();
    expect(animeImage.props.source.uri).toEqual(animeDetail.banner_image);
  });

  test('should show title with success', () => {
    const animeDetail = makeAnimeDetail();
    const { getByTestId } = render(
      renderWithParams({
        screen: AnimeDetailContainer,
        screenProps: { animeDetail: animeDetail },
      }),
    );

    const animeTitle = getByTestId('anime_title_id');
    expect(animeTitle).toBeTruthy();
    expect(animeTitle.props.children).toEqual(animeDetail.titles.en);
  });

  test('should list with success the genres of anime', () => {
    const animeDetail = makeAnimeDetail();
    const { getByTestId } = render(
      renderWithParams({
        screen: AnimeDetailContainer,
        screenProps: { animeDetail: animeDetail },
      }),
    );

    const animeGenresScroll = getByTestId('anime_genres_scroll_id');
    expect(animeGenresScroll).toBeTruthy();

    const keyFirstAnimeGenre = animeDetail.genres.indexOf(
      animeDetail.genres[0],
    );
    const firstAnimeGenre = getByTestId(`anime_genre_${keyFirstAnimeGenre}`);
    expect(firstAnimeGenre).toBeTruthy();
    expect(firstAnimeGenre.props.children).toEqual(
      animeDetail.genres[keyFirstAnimeGenre],
    );
  });
});

const makeAnimeDetail = (): AnimeDetail.Detail => {
  return {
    banner_image: faker.internet.url(),
    cover_image: faker.internet.url(),
    descriptions: { en: faker.commerce.productDescription() },
    episodes_count: faker.datatype.number(),
    genres: ['Adventure', 'Action'],
    start_date: faker.date.past().toISOString(),
    titles: {
      en: faker.name.title(),
    },
  };
};

type Props = {
  animeDetail: AnimeDetail.Detail;
};

const AnimeDetailContainer: React.FC<Props> = ({ animeDetail }) => {
  return (
    <View>
      <View>
        <Image
          width={width}
          height={100}
          testID="anime_image_id"
          source={{ uri: animeDetail.banner_image }}
        />
        <Text testID="anime_title_id">{animeDetail.titles.en}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          testID="anime_genres_scroll_id"
        >
          {animeDetail.genres.map((genre, index) => (
            <View key={index}>
              <Text testID={`anime_genre_${index}`}>{genre}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

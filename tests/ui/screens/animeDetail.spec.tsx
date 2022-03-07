import React from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import faker from 'faker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { render } from '@testing-library/react-native';
import { AnimeDetail } from '~/domain/useCases';
import { renderWithParams } from '../helpers';

const { width } = Dimensions.get('screen');

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

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

  test('should show description about the anime with success', () => {
    const animeDetail = makeAnimeDetail();
    const { getByTestId } = render(
      renderWithParams({
        screen: AnimeDetailContainer,
        screenProps: { animeDetail: animeDetail },
      }),
    );

    const aboutAnime = getByTestId('about_anime_id');
    expect(aboutAnime).toBeTruthy();
    expect(aboutAnime.props.children).toEqual(animeDetail.descriptions.en);
  });

  test('should show the content of the amount of the anime episodes successfully', () => {
    const animeDetail = makeAnimeDetail();
    const { getByTestId } = render(
      renderWithParams({
        screen: AnimeDetailContainer,
        screenProps: { animeDetail: animeDetail },
      }),
    );

    const quantityEpisodesIcon = getByTestId('quantity_episodes_icon_id');
    const episodesQuantity = getByTestId('episodes_quantity_id');
    expect(quantityEpisodesIcon).toBeTruthy();
    expect(quantityEpisodesIcon.props.name).toEqual('video-collection');
    expect(quantityEpisodesIcon.props.size).toEqual(14);
    expect(episodesQuantity).toBeTruthy();
    expect(episodesQuantity.props.children).toEqual(animeDetail.episodes_count);
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
        <View>
          <View>
            <Icon
              testID="quantity_episodes_icon_id"
              name="video-collection"
              size={14}
            />
            <Text testID="episodes_quantity_id">
              {animeDetail.episodes_count}
            </Text>
          </View>
        </View>
        <View>
          <Text>About</Text>
          <Text testID="about_anime_id">{animeDetail.descriptions.en}</Text>
        </View>
      </View>
    </View>
  );
};

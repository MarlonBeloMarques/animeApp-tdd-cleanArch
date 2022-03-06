import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
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
      </View>
    </View>
  );
};

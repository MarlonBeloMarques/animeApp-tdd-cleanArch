import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { Anime } from '~/domain/useCases';
import { renderWithParams } from '../helpers';

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
});

type Props = {
  animeList: Array<Anime.ModelDocument>;
};

const Animes: React.FC<Props> = ({ animeList = [] }) => {
  return (
    <View>
      <FlatList
        data={animeList}
        renderItem={({}) => <View></View>}
        ListEmptyComponent={
          <Text testID="animes_is_empty_id">
            {`We couldn't find any anime to show you. Try again later.`}
          </Text>
        }
      />
    </View>
  );
};

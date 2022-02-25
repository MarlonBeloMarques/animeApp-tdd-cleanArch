import React from 'react';
import { Dimensions, FlatList, Text } from 'react-native';
import { Anime } from '~/domain/useCases';
import {
  Background,
  ButtonAnime,
  ImageAnime,
  TitleAnime,
  WrapperAnime,
  WrapperBackground,
  WrapperContent,
  WrapperScreen,
} from './styles';

const { height, width } = Dimensions.get('screen');

type Props = {
  animeList: Array<Anime.ModelDocument>;
  onPressDetailAnime: () => void;
  getMoreAnime: () => void;
  onEndReachedThreshold?: number;
};

const AnimesContainer: React.FC<Props> = ({
  animeList,
  onPressDetailAnime,
  getMoreAnime,
  onEndReachedThreshold = 0.5,
}) => {
  return (
    <WrapperScreen>
      <WrapperContent>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          numColumns={2}
          testID="anime_list_id"
          data={animeList}
          renderItem={({ item }) => (
            <WrapperAnime testID={`anime_${item.id}`}>
              <ButtonAnime
                activeOpacity={0.8}
                testID={`anime_button_${item.id}`}
                onPress={onPressDetailAnime}
              >
                <ImageAnime source={{ uri: item.cover_image }} />
                <TitleAnime>{item.titles.en}</TitleAnime>
              </ButtonAnime>
            </WrapperAnime>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center' }} testID="animes_is_empty_id">
              {`We couldn't find any anime to show you. Try again later.`}
            </Text>
          }
          onEndReached={getMoreAnime}
          onEndReachedThreshold={onEndReachedThreshold}
        />
      </WrapperContent>
      <WrapperBackground>
        <Background width={width} height={height} />
      </WrapperBackground>
    </WrapperScreen>
  );
};

export default AnimesContainer;

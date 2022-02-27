import React from 'react';
import { Dimensions, NativeScrollEvent, ScrollView } from 'react-native';
import { AnimeModelDocument } from 'src/domain/models';
import { ModelDocumentImage } from '../animes.spec';
import {
  Background,
  ButtonAnime,
  ImageAnime,
  IsEmpty,
  TitleAnime,
  WrapperAnime,
  WrapperAnimeList,
  WrapperBackground,
  WrapperContent,
  WrapperScreen,
} from './styles';

const { height, width } = Dimensions.get('screen');

type AnimeListIsEmptyProps = {
  animeList: Array<ModelDocumentImage<AnimeModelDocument>>;
};

type AnimeCardProps = {
  anime: ModelDocumentImage<AnimeModelDocument>;
};

type Props = {
  animeList: Array<ModelDocumentImage<AnimeModelDocument>>;
  onPressDetailAnime: () => void;
  getMoreAnime: () => void;
  onEndReached: (
    onEndReachedThreshold: number,
    nativeEvent: NativeScrollEvent,
  ) => boolean;
  onEndReachedThreshold?: number;
};

const AnimesContainer: React.FC<Props> = ({
  animeList,
  onPressDetailAnime,
  getMoreAnime,
  onEndReachedThreshold = 20,
  onEndReached,
}) => {
  const getMaxHeightFromAnimeList = (
    animeList: Array<ModelDocumentImage<AnimeModelDocument>>,
  ) => {
    return animeList.reduce(
      (sum, animeCurrent) => sum + animeCurrent.cover_image_size.height,
      0,
    );
  };

  const AnimeCard = ({ anime }: AnimeCardProps) => {
    return (
      <WrapperAnime key={anime.id} testID={`anime_${anime.id}`}>
        <ButtonAnime
          activeOpacity={0.8}
          testID={`anime_button_${anime.id}`}
          onPress={onPressDetailAnime}
        >
          <ImageAnime
            width={anime.cover_image_size.width}
            height={anime.cover_image_size.height}
            source={{ uri: anime.cover_image }}
          />
          <TitleAnime>{anime.titles?.en}</TitleAnime>
        </ButtonAnime>
      </WrapperAnime>
    );
  };

  const AnimeListIsEmpty = ({
    animeList,
  }: AnimeListIsEmptyProps): JSX.Element =>
    animeList.length === 0 ? (
      <IsEmpty testID="animes_is_empty_id">
        {`We couldn't find any anime to show you. Try again later.`}
      </IsEmpty>
    ) : (
      <></>
    );

  return (
    <WrapperScreen>
      <WrapperContent>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          testID="anime_list_id"
          onScroll={({ nativeEvent }) => {
            if (onEndReached(onEndReachedThreshold, nativeEvent)) {
              getMoreAnime();
            }
          }}
        >
          <AnimeListIsEmpty animeList={animeList} />
          <WrapperAnimeList
            height={Math.round(getMaxHeightFromAnimeList(animeList) / 2)}
          >
            {animeList.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </WrapperAnimeList>
        </ScrollView>
      </WrapperContent>
      <WrapperBackground>
        <Background width={width} height={height} />
      </WrapperBackground>
    </WrapperScreen>
  );
};

export default AnimesContainer;

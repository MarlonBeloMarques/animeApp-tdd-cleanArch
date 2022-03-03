import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  NativeScrollEvent,
  ScrollView,
} from 'react-native';
import { AnimeModelDocument } from 'src/domain/models';
import { getTheme } from '~/presentation/helpers';
import { ModelDocumentImageList } from '~/presentation/protocols';
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
  animeList: Array<
    ModelDocumentImageList.ModelDocumentImage<AnimeModelDocument>
  >;
};

type AnimeCardProps = {
  anime: ModelDocumentImageList.ModelDocumentImage<AnimeModelDocument>;
};

type Props = {
  animeList: Array<
    ModelDocumentImageList.ModelDocumentImage<AnimeModelDocument>
  >;
  animeStatusMessage: string;
  onPressDetailAnime: () => void;
  getMoreAnime: () => void;
  onEndReached: (
    onEndReachedThreshold: number,
    nativeEvent: NativeScrollEvent,
  ) => boolean;
  onEndReachedThreshold: number;
  isLoading: boolean;
};

const Animes: React.FC<Props> = ({
  animeList,
  onPressDetailAnime,
  getMoreAnime,
  onEndReachedThreshold,
  onEndReached,
  isLoading,
}) => {
  const getMaxHeightFromAnimeList = (
    animeList: Array<
      ModelDocumentImageList.ModelDocumentImage<AnimeModelDocument>
    >,
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
    animeList.length === 0 && !isLoading ? (
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
          {isLoading && (
            <ActivityIndicator
              testID="loading_id"
              color={getTheme('white')}
              size="large"
            />
          )}
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
export default Animes;

import React from 'react';
import { ActivityIndicator, Dimensions, NativeScrollEvent } from 'react-native';
import { AnimeModelDocument } from 'src/domain/models';
import { getTheme, makeId } from '~/presentation/helpers';
import { ModelDocumentImageList } from '~/presentation/protocols';
import {
  Background,
  ButtonAnime,
  ContentScroll,
  ImageAnime,
  IsEmpty,
  TitleAnime,
  WrapperAnime,
  WrapperAnimeList,
  WrapperBackground,
  WrapperContent,
  WrapperLoading,
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
  page: number;
  animeStatusMessage: string;
  onPressDetailAnime: (
    modelDocumentImage: ModelDocumentImageList.ModelDocumentImage<AnimeModelDocument>,
  ) => void;
  getMoreAnime: () => void;
  onEndReached: (
    onEndReachedThreshold: number,
    nativeEvent: NativeScrollEvent,
  ) => boolean;
  onEndReachedThreshold: number;
  isLoading: boolean;
  waitForEndReached: boolean;
};

const Animes: React.FC<Props> = ({
  animeList,
  onPressDetailAnime,
  getMoreAnime,
  onEndReachedThreshold,
  onEndReached,
  isLoading,
  waitForEndReached,
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
      <WrapperAnime
        key={`${makeId()}_${anime.id}`}
        testID={`anime_${anime.id}`}
      >
        <ButtonAnime
          activeOpacity={0.8}
          testID={`anime_button_${anime.id}`}
          onPress={() => onPressDetailAnime(anime)}
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
      {isLoading && (
        <WrapperLoading
          width={width}
          height={height}
          showBackgroundColor={waitForEndReached}
        >
          <ActivityIndicator
            testID="loading_id"
            color={getTheme('white')}
            size="large"
          />
        </WrapperLoading>
      )}
      <WrapperContent>
        <ContentScroll
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            marginTop: getTheme('largeSpacing') * 2,
          }}
          testID="anime_list_id"
          onScroll={({ nativeEvent }) => {
            if (onEndReached(onEndReachedThreshold, nativeEvent)) {
              getMoreAnime();
            }
          }}
          scrollEventThrottle={1}
        >
          <AnimeListIsEmpty animeList={animeList} />
          <WrapperAnimeList
            height={Math.round(getMaxHeightFromAnimeList(animeList) / 2)}
          >
            {animeList.map((anime) => (
              <AnimeCard key={`${makeId()}_${anime.id}`} anime={anime} />
            ))}
          </WrapperAnimeList>
        </ContentScroll>
      </WrapperContent>
      <WrapperBackground>
        <Background width={width} height={height} />
      </WrapperBackground>
    </WrapperScreen>
  );
};
export default Animes;

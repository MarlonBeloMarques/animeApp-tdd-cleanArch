import React, { useMemo } from 'react';
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
  WrapperAnimeCard,
  WrapperAnimeList,
  WrapperAnimeListIsEmpty,
  WrapperBackground,
  WrapperContent,
  WrapperLoading,
  WrapperScreen,
} from './styles';

const { height, width } = Dimensions.get('screen');

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
    waitForEndReached: boolean,
    { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent,
  ) => boolean;
  onEndReachedThreshold: number;
  isLoading: boolean;
  waitForEndReached: boolean;
  animeListIsEmpty: boolean;
};

const Animes: React.FC<Props> = ({
  animeList,
  onPressDetailAnime,
  getMoreAnime,
  onEndReachedThreshold,
  onEndReached,
  isLoading,
  waitForEndReached,
  animeListIsEmpty,
}) => {
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

  const AnimeListIsEmpty = (): JSX.Element =>
    animeListIsEmpty ? (
      <WrapperAnimeListIsEmpty width={width} height={height}>
        <IsEmpty testID="animes_is_empty_id">
          {`We couldn't find any anime to show you. Try again later.`}
        </IsEmpty>
      </WrapperAnimeListIsEmpty>
    ) : (
      <></>
    );

  const renderAnimeList = useMemo(
    () => (
      <WrapperAnimeList>
        {Array.from(Array(2), (_, num) => {
          return (
            <WrapperAnimeCard key={`${makeId()}-${num.toString()}`}>
              {animeList
                .map((el, i) => {
                  if (i % 2 === num)
                    return (
                      <AnimeCard key={`${makeId()}_${el.id}`} anime={el} />
                    );

                  return null;
                })
                .filter((e) => !!e)}
            </WrapperAnimeCard>
          );
        })}
      </WrapperAnimeList>
    ),
    [animeList],
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
      <AnimeListIsEmpty />
      <WrapperContent>
        <ContentScroll
          contentContainerStyle={{
            alignSelf: 'stretch',
            flexGrow: 1,
            justifyContent: 'center',
            marginTop: getTheme('largeSpacing') * 2,
          }}
          testID="anime_list_id"
          onScroll={({ nativeEvent }) => {
            if (
              onEndReached(
                onEndReachedThreshold,
                waitForEndReached,
                nativeEvent,
              )
            ) {
              getMoreAnime();
            }
          }}
          scrollEventThrottle={1}
        >
          {renderAnimeList}
        </ContentScroll>
      </WrapperContent>
      <WrapperBackground>
        <Background width={width} height={height} />
      </WrapperBackground>
    </WrapperScreen>
  );
};
export default Animes;

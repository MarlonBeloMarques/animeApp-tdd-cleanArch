import React from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AnimeDetail as AnimeDetailUseCase } from '~/domain/useCases';
import { getTheme } from '~/presentation/helpers';
import {
  AnimeAbout,
  AnimeBanner,
  AnimeDescription,
  AnimeGenresScroll,
  AnimeTitle,
  Background,
  DateReleaseAnime,
  GenreAnime,
  QuantityEpisodesAnime,
  WrapperAboutAnime,
  WrapperAnimeDetail,
  WrapperAnimeDetails,
  WrapperAnimeGenre,
  WrapperBackground,
  WrapperContent,
  WrapperDateReleaseAnime,
  WrapperQuantityEpisodesAnime,
  WrapperScreen,
} from './styles';

const { width, height } = Dimensions.get('screen');

const animeBannerHeight = height / 2;

type Props = {
  animeDetail: AnimeDetailUseCase.Detail;
};

const AnimeDetail: React.FC<Props> = ({ animeDetail }) => {
  const getDescriptionsAnime = () => {
    return animeDetail.descriptions.en.replace(/<\/?[^>]+(>|$)/g, '');
  };

  const getDateRelease = () => {
    return new Date(animeDetail.start_date).toLocaleDateString();
  };

  return (
    <WrapperScreen>
      <WrapperContent height={animeBannerHeight * 1.05}>
        <WrapperAnimeDetail>
          <AnimeTitle testID="anime_title_id">
            {animeDetail.titles.en}
          </AnimeTitle>
          <AnimeGenresScroll
            horizontal
            style={{ marginVertical: getTheme('mediumSpacing') }}
            showsHorizontalScrollIndicator={false}
            testID="anime_genres_scroll_id"
          >
            {animeDetail.genres.map((genre, index) => (
              <WrapperAnimeGenre key={index}>
                <GenreAnime testID={`anime_genre_${index}`}>{genre}</GenreAnime>
              </WrapperAnimeGenre>
            ))}
          </AnimeGenresScroll>
          <WrapperAnimeDetails>
            <WrapperQuantityEpisodesAnime>
              <Icon
                testID="quantity_episodes_icon_id"
                name="video-collection"
                size={14}
                color={getTheme('quaternary')}
              />
              <QuantityEpisodesAnime testID="episodes_quantity_id">
                {`${animeDetail.episodes_count} episodes`}
              </QuantityEpisodesAnime>
            </WrapperQuantityEpisodesAnime>
            <WrapperDateReleaseAnime>
              <Icon
                testID="date_release_icon_id"
                name="calendar-today"
                size={14}
                color={getTheme('quaternary')}
              />
              <DateReleaseAnime testID="date_release_id">
                {getDateRelease()}
              </DateReleaseAnime>
            </WrapperDateReleaseAnime>
          </WrapperAnimeDetails>
          <WrapperAboutAnime>
            <AnimeAbout>About</AnimeAbout>
            <AnimeDescription testID="about_anime_id">
              {getDescriptionsAnime()}
            </AnimeDescription>
          </WrapperAboutAnime>
        </WrapperAnimeDetail>
        <WrapperBackground>
          <Background width={width} height={animeBannerHeight * 1.05} />
        </WrapperBackground>
      </WrapperContent>
      <AnimeBanner
        width={width}
        height={animeBannerHeight}
        testID="anime_image_id"
        source={{ uri: animeDetail.banner_image }}
      />
    </WrapperScreen>
  );
};

export default AnimeDetail;

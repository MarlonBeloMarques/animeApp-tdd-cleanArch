import styled from 'styled-components/native';
import { BackgroundText } from '~/presentation/assets/svg';
import { getTheme } from '~/presentation/helpers';

const mediumSpacing = getTheme('mediumSpacing');
const minimumSpacing = getTheme('minimumSpacing');

const caption1 = getTheme('caption1');
const body = getTheme('body');
const title = getTheme('title1');
const callout = getTheme('callout');

const tertiary = getTheme('tertiary');

const Wrapper = styled.View`
  flex: 1;
`;

const Text = styled.Text`
  color: ${getTheme('text')};
`;

export const Background = styled(BackgroundText)``;

export const WrapperScreen = styled(Wrapper)`
  flex-direction: column;
`;

export const WrapperAnimeDetail = styled.View`
  z-index: 2;
`;

type WrapperContentProps = {
  height: number;
};

export const WrapperContent = styled(Wrapper)<WrapperContentProps>`
  padding: ${mediumSpacing}px;
  height: ${({ height }) => height}px;
  z-index: 2;
  border-radius: ${getTheme('largeRadius')}px;
  position: absolute;
  background-color: ${getTheme('primary')};
  bottom: 0;
`;

export const WrapperBackground = styled.View`
  position: absolute;
  z-index: 1;
  opacity: 0.1;
`;

export const WrapperAboutAnime = styled.View`
  margin: ${getTheme('largeSpacing')}px 0px;
`;

export const WrapperAnimeGenre = styled.View`
  padding: 2px ${getTheme('bottomSpacing')}px;
  border-radius: ${getTheme('buttonRadius')}px;
  border-color: ${tertiary};
  border-width: 1px;
  margin: 0px ${minimumSpacing}px;
`;

export const WrapperAnimeDetails = styled.View`
  justify-content: flex-end;
  flex-direction: row;
`;

const WrapperDetailAnimeContent = styled.View`
  flex-direction: row;
  margin: 0px ${getTheme('smallSpacing')}px;
`;

export const WrapperQuantityEpisodesAnime = styled(WrapperDetailAnimeContent)``;

export const WrapperDateReleaseAnime = styled(WrapperDetailAnimeContent)``;

export const AnimeGenresScroll = styled.ScrollView``;

export const AnimeTitle = styled(Text)`
  font-weight: bold;
  font-size: ${title.fontSize}px;
  line-height: ${title.lineHeight}px;
`;

export const AnimeAbout = styled(Text)`
  font-weight: bold;
  font-size: ${body.fontSize}px;
  line-height: ${body.lineHeight}px;
  margin-bottom: ${minimumSpacing}px;
`;

export const AnimeDescription = styled(Text)`
  font-size: ${callout.fontSize}px;
  line-height: ${callout.lineHeight}px;
`;

type AnimeBannerProps = {
  width: number;
  height: number;
};

export const AnimeBanner = styled.Image<AnimeBannerProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  z-index: 1;
`;

export const GenreAnime = styled.Text`
  font-size: ${caption1.fontSize}px;
  line-height: ${caption1.lineHeight}px;
  color: ${tertiary};
`;

const DetailAnimeContent = styled.Text`
  font-size: ${caption1.fontSize}px;
  line-height: ${caption1.lineHeight}px;
  color: ${getTheme('quaternary')};
  margin-left: ${minimumSpacing}px;
`;

export const QuantityEpisodesAnime = styled(DetailAnimeContent)``;

export const DateReleaseAnime = styled(DetailAnimeContent)``;

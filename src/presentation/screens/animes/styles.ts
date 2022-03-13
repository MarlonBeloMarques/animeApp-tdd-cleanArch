import { Dimensions, Text } from 'react-native';
import styled from 'styled-components/native';
import { BackgroundText } from '~/presentation/assets/svg';
import { getTheme } from '~/presentation/helpers';

const isEmpty = getTheme('title3');
const baseSpacing = getTheme('baseSpacing');
const text = getTheme('text');

const Wrapper = styled.View`
  flex: 1;
`;

export const WrapperScreen = styled(Wrapper)`
  flex: 1;
`;

export const WrapperContent = styled(Wrapper)`
  flex: 1;
  padding: 0px ${getTheme('smallSpacing')}px;
  z-index: 2;
`;

export const ContentScroll = styled.ScrollView``;

type WrapperOrientationProps = {
  height: number;
  width: number;
};

type WrapperLoadingProps = {
  showBackgroundColor: boolean;
};

const WrapperOrientation = styled.View<WrapperOrientationProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  position: absolute;
  z-index: 4;
  justify-content: center;
  align-items: center;
`;

export const WrapperLoading = styled(WrapperOrientation)<WrapperLoadingProps>`
  ${({ showBackgroundColor }) =>
    showBackgroundColor && `background-color: rgba(52, 52, 52, 0.6)`}
`;

export const WrapperAnimeListIsEmpty = styled(WrapperOrientation)`
  flex: 1;
`;

export const WrapperAnime = styled.View`
  width: ${Dimensions.get('screen').width / 2 -
  (getTheme('smallSpacing') + 10)}px;
  margin-top: 17px;
  margin-right: 5px;
  margin-left: 5px;
`;

export const WrapperAnimeCard = styled.View`
  flex: 0.5;
  flex-direction: column;
`;

export const WrapperAnimeList = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const IsEmpty = styled(Text)`
  font-size: ${isEmpty.fontSize}px;
  line-height: ${isEmpty.lineHeight}px;
  text-align: center;
  color: ${text};
  margin: 0px ${baseSpacing}px;
`;

export const ButtonAnime = styled.TouchableOpacity``;

export const TitleAnime = styled.Text`
  color: ${getTheme('text')};
  font-size: ${getTheme('callout').fontSize}px;
  line-height: ${getTheme('callout').lineHeight}px;
`;

type ImageAnimeProps = {
  width: number;
  height: number;
};

export const ImageAnime = styled.Image<ImageAnimeProps>`
  border-radius: ${getTheme('largeRadius')}px;
  margin-bottom: 7px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export const WrapperBackground = styled.View`
  position: absolute;
  z-index: 1;
  opacity: 0.1;
`;

export const Background = styled(BackgroundText)``;

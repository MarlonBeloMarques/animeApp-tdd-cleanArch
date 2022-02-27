import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { BackgroundText } from '~/presentation/assets/svg';
import { getTheme } from '~/presentation/helpers';

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

export const WrapperAnime = styled.View`
  width: ${Dimensions.get('screen').width / 2 -
  (getTheme('smallSpacing') + 10)}px;
  margin-top: 17px;
  margin-right: 5px;
  margin-left: 5px;
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

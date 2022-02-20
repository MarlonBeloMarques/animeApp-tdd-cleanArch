import styled from 'styled-components/native';
import { BackgroundText } from '~/presentation/assets/svg';
import { getTheme } from '~/presentation/helpers';

const mediumSpacing = getTheme('mediumSpacing');
const largeSpacing = getTheme('largeSpacing');
const title = getTheme('title1');
const subtitle = getTheme('largeTitle');
const description = getTheme('title3');
const baseSpacing = getTheme('baseSpacing');
const buttonColor = getTheme('secondary');
const buttonRadius = getTheme('buttonRadius');
const textButton = getTheme('body');

const Wrapper = styled.View`
  flex: 1;
`;

const Text = styled.Text`
  color: ${getTheme('text')};
`;

export const WrapperScreen = styled(Wrapper)`
  flex-direction: column;
`;

export const WrapperContent = styled(Wrapper)`
  padding: ${mediumSpacing}px ${largeSpacing}px;
  z-index: 2;
`;

export const TitleContainer = styled.View`
  margin-top: 160px;
  align-items: center;
  margin-bottom: 48px;
  height: 100px;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled(Text)`
  font-weight: bold;
  font-size: ${title.fontSize}px;
  line-height: ${title.lineHeight}px;
`;

export const SubTitle = styled(Text)`
  font-weight: bold;
  font-size: ${subtitle.fontSize}px;
  line-height: ${subtitle.lineHeight}px;
`;

export const Description = styled(Text)`
  font-size: ${description.fontSize}px;
  line-height: ${description.lineHeight}px;
  text-align: center;
  margin: 0px ${baseSpacing}px;
`;

export const WrapperButton = styled(Wrapper)`
  justify-content: flex-end;
  padding-bottom: 80px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${buttonColor};
  align-items: center;
  justify-content: center;
  height: 57px;
  border-radius: ${buttonRadius}px;
`;

export const TextButton = styled(Text)`
  font-weight: bold;
  font-size: ${textButton.fontSize}px;
  line-height: ${textButton.lineHeight}px;
`;

export const WrapperBackground = styled.View`
  position: absolute;
  z-index: 1;
  opacity: 0.2;
`;

export const Background = styled(BackgroundText)``;

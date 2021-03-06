import React from 'react';
import { Dimensions } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {
  Background,
  Button,
  Description,
  SubTitle,
  TextButton,
  Title,
  TitleContainer,
  WrapperBackground,
  WrapperButton,
  WrapperContent,
  WrapperScreen,
} from './styles';

const { width, height } = Dimensions.get('screen');

type Props = {
  onPressAuthentication: () => void;
};

const Authentication: React.FC<Props> = ({ onPressAuthentication }) => {
  return (
    <WrapperScreen>
      <FlashMessage testID="flash_message_id" position="top" />
      <WrapperContent>
        <TitleContainer>
          <Title testID="title_id">ANIMEAPP</Title>
          <SubTitle testID="subtitle_id">アニメ</SubTitle>
        </TitleContainer>
        <Description testID="description_id">
          a catalog full of varied animes, containing all the information you
          need.
        </Description>
        <WrapperButton>
          <Button
            activeOpacity={0.8}
            testID="authentication_id"
            onPress={onPressAuthentication}
          >
            <TextButton>{`LET'S BEGIN`}</TextButton>
          </Button>
        </WrapperButton>
      </WrapperContent>
      <WrapperBackground>
        <Background width={width} height={height} />
      </WrapperBackground>
    </WrapperScreen>
  );
};

export default Authentication;

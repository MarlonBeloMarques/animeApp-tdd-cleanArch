import React from 'react';
import { Dimensions } from 'react-native';
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
      <WrapperContent>
        <TitleContainer>
          <Title testID="title_id">ANIMEAPP</Title>
          <SubTitle testID="subtitle_id">アニメ</SubTitle>
        </TitleContainer>
        <Description testID="description_id">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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

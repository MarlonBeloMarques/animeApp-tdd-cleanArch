import styled from 'styled-components/native';
import { BackgroundText } from '~/presentation/assets/svg';

export const WrapperScreen = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const WrapperContent = styled.View`
  padding: 20px 40px;
  flex: 1;
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

export const Title = styled.Text`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #ffffff;
`;

export const SubTitle = styled.Text`
  font-weight: bold;
  font-size: 48px;
  line-height: 55px;
  color: #ffffff;
`;

export const Description = styled.Text`
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  margin: 0px 16px;
  color: #ffffff;
`;

export const WrapperButton = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-bottom: 80px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #5c5675;
  align-items: center;
  justify-content: center;
  height: 57px;
  border-radius: 24px;
`;

export const TextButton = styled.Text`
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
`;

export const WrapperBackground = styled.View`
  position: absolute;
  z-index: 1;
  opacity: 0.2;
`;

export const Background = styled(BackgroundText)``;

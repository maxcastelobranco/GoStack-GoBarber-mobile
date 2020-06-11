import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 48px 0 24px;
`;

export const BackToSignInButton = styled.TouchableOpacity`
  width: 100%;
  margin-top: 24px;
  background: #312e38;
  padding: 8px 0 ${16 + getBottomSpace()}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackToSignInButtonText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #fff;
  font-size: 18px;
  margin-left: 16px;
`;

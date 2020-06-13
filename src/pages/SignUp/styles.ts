import styled from 'styled-components/native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import responsivePixelSize from "../../utils/responsivePixelSize";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 ${responsivePixelSize(32)}px;
`;

export const Title = styled.Text`
  font-size: ${responsivePixelSize(24)}px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: ${responsivePixelSize(48)}px 0 ${responsivePixelSize(24)}px;
`;

export const BackToSignInButton = styled.TouchableOpacity`
  width: 100%;
  margin-top: ${responsivePixelSize(24)}px;
  background: #312e38;
  padding: ${responsivePixelSize(8)}px 0 ${Number(responsivePixelSize(16)) + getBottomSpace()}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackToSignInButtonText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #fff;
  font-size: ${responsivePixelSize(18)}px;
  margin-left: ${responsivePixelSize(16)}px;
`;

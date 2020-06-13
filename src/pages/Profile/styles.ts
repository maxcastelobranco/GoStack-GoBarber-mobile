import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import responsivePixelSize from '../../utils/responsivePixelSize';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 ${responsivePixelSize(32)}px;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const BackButton = styled(RectButton)`
  margin-top: ${responsivePixelSize(12)}px;
  width: ${responsivePixelSize(48)}px;
  height: ${responsivePixelSize(48)}px;
`;

export const Title = styled.Text`
  font-size: ${responsivePixelSize(20)}px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin-left: ${responsivePixelSize(12)}px;
  margin-bottom: ${responsivePixelSize(16)}px;
  align-self: flex-start;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin: 0 auto;
`;

export const UserAvatar = styled.Image`
  width: ${responsivePixelSize(150)}px;
  height: ${responsivePixelSize(150)}px;
  border-radius: ${responsivePixelSize(93)}px;
  border-width: ${responsivePixelSize(4)}px;
  border-color: #ff9000;
`;

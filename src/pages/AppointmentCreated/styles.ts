import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import responsivePixelSize from '../../utils/responsivePixelSize';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 ${responsivePixelSize(24)}px;
`;

export const Title = styled.Text`
  font-size: ${responsivePixelSize(36)}px;
  margin-top: ${responsivePixelSize(40)}px;
  color: #f4ede8;
  font-family: RobotoSlab-Medium;
  text-align: center;
`;

export const Description = styled.Text`
  font-size: ${responsivePixelSize(18)}px;
  margin-top: ${responsivePixelSize(16)}px;
  color: #999591;
  font-family: RobotoSlab-Regular;
  text-align: center;
`;

export const OkButton = styled(RectButton)`
  background-color: #ff9000;
  justify-content: center;
  align-items: center;
  border-radius: ${responsivePixelSize(12)}px;
  margin-top: ${responsivePixelSize(24)}px;
  padding: ${responsivePixelSize(12)}px ${responsivePixelSize(24)}px;
`;

export const OkButtonText = styled.Text`
  font-size: ${responsivePixelSize(18)}px;
  color: #312e38;
  font-family: RobotoSlab-Medium;
`;

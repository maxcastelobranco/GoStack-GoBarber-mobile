import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import responsivePixelSize from "../../utils/responsivePixelSize";

export const Container = styled(RectButton)`
  width: 100%;
  height: ${responsivePixelSize(60)}px;
  background: #ff9000;
  border-radius: ${responsivePixelSize(12)}px;
  margin-top: ${responsivePixelSize(8)}px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: ${responsivePixelSize(18)}px;
`;

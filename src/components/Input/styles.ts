import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import responsivePixelSize from "../../utils/responsivePixelSize";

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  height: ${responsivePixelSize(60)}px;
  padding: 0 ${responsivePixelSize(16)}px;
  background: #232129;
  border: ${responsivePixelSize(2)}px solid #232129;
  border-radius: ${responsivePixelSize(12)}px;
  margin-bottom: ${responsivePixelSize(8)}px;
  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: ${responsivePixelSize(16)}px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: ${responsivePixelSize(16)}px;
`;

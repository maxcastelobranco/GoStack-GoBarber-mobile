import styled, {css} from 'styled-components/native';
import {Platform, FlatList} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RectButton} from 'react-native-gesture-handler';
import responsivePixelSize from '../../utils/responsivePixelSize';
import {Provider} from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  background: #28262e;
  padding: ${responsivePixelSize(24)}px;
  ${Platform.OS === 'ios' &&
  css`
    padding-top: ${responsivePixelSize(getStatusBarHeight() + 24)}px;
  `};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: ${responsivePixelSize(20)}px;
  font-family: RobotoSlab-Regular;
  line-height: ${responsivePixelSize(28)}px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: RobotoSlab-Medium;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: ${responsivePixelSize(56)}px;
  height: ${responsivePixelSize(56)}px;
  border-radius: ${responsivePixelSize(28)}px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: ${responsivePixelSize(32)}px ${responsivePixelSize(24)}px ${responsivePixelSize(16)}px;
`;

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: ${responsivePixelSize(12)}px;
  padding: ${responsivePixelSize(20)}px;
  margin-bottom: ${responsivePixelSize(16)}px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: ${responsivePixelSize(72)}px;
  height: ${responsivePixelSize(72)}px;
  border-radius: ${responsivePixelSize(36)}px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: ${responsivePixelSize(20)}px;
`;

export const ProviderName = styled.Text`
  font-family: RobotoSlabMedium;
  font-size: ${responsivePixelSize(18)}px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${responsivePixelSize(8)}px;
`;

export const ProviderMetaText = styled.Text`
  margin-left: ${responsivePixelSize(8)}px;
  color: #999591;
  font-family: RobotoSlabRegular;
`;

export const ProviderListHeader = styled.View`
  flex-direction: row;
`;

export const ProviderListHeaderText = styled.Text`
  font-size: ${responsivePixelSize(28)}px;
  margin-bottom: ${responsivePixelSize(28)}px;
  margin-left: ${responsivePixelSize(12)}px;
  color: #999591;
  font-family: RobotoSlabMedium;
`;

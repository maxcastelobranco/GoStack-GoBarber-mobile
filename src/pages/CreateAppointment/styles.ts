import styled, {css} from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {FlatList, Platform, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import responsivePixelSize from '../../utils/responsivePixelSize';
import {Provider} from '../Dashboard';

interface SelectedProps {
  selected: boolean;
}
interface AvailableProps {
  available: boolean;
}
interface SelectedAvailableProps extends SelectedProps, AvailableProps {}

export const Container = styled.View``;

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

export const BackButton = styled(RectButton)`
  margin-right: ${responsivePixelSize(16)}px;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-family: RobotoSlab-Medium;
  font-size: ${responsivePixelSize(24)}px;
  margin-left: ${responsivePixelSize(16)}px;
`;

export const UserAvatar = styled.Image`
  width: ${responsivePixelSize(56)}px;
  height: ${responsivePixelSize(56)}px;
  border-radius: ${responsivePixelSize(28)}px;
  margin-left: auto;
`;

export const ProvidersListContainer = styled.View`
  height: ${responsivePixelSize(120)}px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: ${responsivePixelSize(28)}px ${responsivePixelSize(24)}px;
`;

export const ProviderContainer = styled(RectButton)<SelectedProps>`
  background: #3e3b47;
  ${(props) =>
    props.selected &&
    css`
      background: #ff9000;
    `};
  border-radius: ${responsivePixelSize(12)}px;
  margin-bottom: ${responsivePixelSize(16)}px;
  flex-direction: row;
  align-items: center;
  padding: ${responsivePixelSize(28)}px ${responsivePixelSize(16)}px;
  margin-right: ${responsivePixelSize(16)}px;
`;

export const ProviderAvatar = styled.Image`
  width: ${responsivePixelSize(40)}px;
  height: ${responsivePixelSize(40)}px;
  border-radius: ${responsivePixelSize(20)}px;
`;

export const ProviderName = styled.Text<SelectedProps>`
  font-family: RobotoSlabMedium;
  font-size: ${responsivePixelSize(16)}px;
  color: #f4ede8;
  margin-left: ${responsivePixelSize(12)}px;
  ${(props) =>
    props.selected &&
    css`
      color: #28262e;
    `};
`;

export const Calendar = styled.View`
  flex-direction: row;
  align-items: center;
  margin-horizontal: ${responsivePixelSize(24)}px;
  padding-bottom: ${responsivePixelSize(16)}px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: #999591;
`;

export const Title = styled.Text`
  font-family: RobotoSlab-Medium;
  color: #f4ede8;
  font-size: ${responsivePixelSize(24)}px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: ${responsivePixelSize(56)}px;
  width: ${responsivePixelSize(56)}px;
  border-radius: ${responsivePixelSize(28)}px;
  background-color: #ff9000;
  align-items: center;
  justify-content: center;
  margin-left: ${responsivePixelSize(16)}px;
`;

export const Schedule = styled.View`
  padding: ${responsivePixelSize(24)}px 0;
  margin-horizontal: ${responsivePixelSize(24)}px;
`;

export const Section = styled.View`
  margin-top: ${responsivePixelSize(24)}px;
`;

export const SectionTitle = styled.Text`
  font-family: RobotoSlab-Regular;
  font-size: ${responsivePixelSize(24)}px;
  color: #999591;
  margin-top: 0;
  margin-bottom: ${responsivePixelSize(4)}px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingVertical: Number(responsivePixelSize(4)),
  },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<SelectedAvailableProps>`
  padding: ${responsivePixelSize(12)}px;
  margin-right: ${responsivePixelSize(8)}px;
  background: #3e3b47;
  border-radius: ${responsivePixelSize(12)}px;
  opacity: ${(props) => (props.available ? 1 : 0.4)};
  ${(props) =>
    props.selected &&
    css`
      background-color: #ff9000;
    `}
`;

export const HourText = styled.Text<SelectedAvailableProps>`
  font-family: RobotoSlab-Regular;
  font-size: ${responsivePixelSize(16)}px;
  color: #f4ede8;
  ${(props) =>
    !props.available &&
    css`
      text-decoration: line-through;
    `}
  ${(props) =>
    props.selected &&
    css`
      color: #28262e;
    `}
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: ${responsivePixelSize(48)}px;
  margin-horizontal: ${responsivePixelSize(24)}px;
  border-radius: ${responsivePixelSize(12)}px;
  background-color: #ff9000;
  align-items: center;
  justify-content: center;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: RobotoSlab-Regular;
  font-size: ${responsivePixelSize(18)}px;
  color: #28262e;
`;

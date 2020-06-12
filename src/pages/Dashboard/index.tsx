import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProviderListHeader,
  ProviderListHeaderText,
} from './styles';
import {useAuth} from '../../hooks/auth';
import api from '../../services/apiClient';
import responsivePixelSize from '../../utils/responsivePixelSize';
import BeardDude from '../../assets/noun_beard.svg';

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const {user} = useAuth();
  const {navigate} = useNavigation();
  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);
  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', {providerId, providers});
    },
    [navigate, providers],
  );

  useEffect(() => {
    api.get<Provider[]>('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  return (
    <Container>
      <Header style={styles.shadow}>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{uri: user.avatar_url}} />
        </ProfileButton>
      </Header>
      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={(
          <ProviderListHeader>
            <BeardDude width={42} height={42} fill="#999591" />
            <ProviderListHeaderText>Listagem de Barbeiros</ProviderListHeaderText>
          </ProviderListHeader>
        )}
        renderItem={({item}) => (
          <ProviderContainer
            style={styles.shadow}
            onPress={() => navigateToCreateAppointment(item.id)}
          >
            <ProviderAvatar source={{uri: item.avatar_url}} />
            <ProviderInfo>
              <ProviderName>{item.name}</ProviderName>
              <ProviderMeta>
                <Feather name="calendar" size={Number(responsivePixelSize(16))} color="#ff9000" />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>
              <ProviderMeta>
                <Feather name="clock" size={Number(responsivePixelSize(16))} color="#ff9000" />
                <ProviderMetaText>8h as 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {Alert, Platform, ScrollView, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {
  Container,
  Header,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Title,
  Calendar,
  OpenDatePickerButton,
  BackButton,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';
import responsivePixelSize from '../../utils/responsivePixelSize';
import api from '../../services/apiClient';
import {useAuth} from '../../hooks/auth';
import {Provider} from '../Dashboard';
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

interface RouteParams {
  providerId: string;
  providers: Provider[];
}
interface Availability {
  available: boolean;
  hour: number;
}

const CreateAppointment: React.FC = () => {
  const {user} = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const {providerId, providers} = route.params as RouteParams;

  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [providerAvailability, setProviderAvailability] = useState<Availability[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const handleSelectedProvider = useCallback((id: string) => {
    setShowDatePicker(false);
    setSelectedProvider(id);
  }, []);
  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((prevState) => !prevState);
  }, []);
  const handleDateChange = useCallback((_event, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    date && setSelectedDate(date);
  }, []);
  const handleSelectedHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);
  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = selectedDate;
      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigation.navigate('AppointmentCreated', {date: date.getTime()});
    } catch (err) {
      console.error(err);
      Alert.alert('Erro ao criar o agendamento', 'Tente novamente');
    }
  }, [selectedProvider, selectedDate, selectedHour, navigation]);

  const morningAvailability = useMemo(() => {
    return providerAvailability
      .filter(({hour}) => hour < 12)
      .map(({hour, available}) => {
        const availabilityDate = selectedDate;
        availabilityDate.setMinutes(0);
        availabilityDate.setHours(hour);

        return {
          hour,
          available,
          formattedHour: format(availabilityDate, 'HH:mm'),
        };
      });
  }, [providerAvailability, selectedDate]);
  const afternoonAvailability = useMemo(() => {
    return providerAvailability
      .filter(({hour}) => hour >= 12)
      .map(({hour, available}) => {
        const availabilityDate = selectedDate;
        availabilityDate.setMinutes(0);
        availabilityDate.setHours(hour);

        return {
          hour,
          available,
          formattedHour: format(availabilityDate, 'HH:mm'),
        };
      });
  }, [providerAvailability, selectedDate]);

  useEffect(() => {
    api
      .get<Availability[]>(`/providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => setProviderAvailability(response.data));
  }, [selectedProvider, selectedDate]);

  return (
    <Container>
      <Header style={styles.shadow}>
        <BackButton onPress={navigateBack}>
          <Feather name="arrow-left" size={Number(responsivePixelSize(24))} color="#999591" />
        </BackButton>
        <BeardDude width={36} height={36} />
        <HeaderTitle>Barbeiro</HeaderTitle>
        <UserAvatar source={{uri: user.avatar_url}} />
      </Header>
      <ScrollView>
        <ProvidersListContainer>
          <ProvidersList
            data={providers}
            keyExtractor={(provider) => provider.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <ProviderContainer
                style={styles.shadow}
                selected={item.id === selectedProvider}
                onPress={() => handleSelectedProvider(item.id)}
              >
                <ProviderAvatar source={{uri: item.avatar_url}} />
                <ProviderName selected={item.id === selectedProvider}>{item.name}</ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>
        <Calendar>
          <Title>Escolha uma data:</Title>
          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <Feather name="calendar" size={Number(responsivePixelSize(28))} color="#28262e" />
          </OpenDatePickerButton>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="calendar"
              textColor="#f4ede8"
              onChange={handleDateChange}
            />
          )}
        </Calendar>
        <Schedule>
          <Title>Escolha um horário:</Title>
          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({hour, formattedHour, available}) => (
                <Hour
                  key={formattedHour}
                  style={styles.shadow}
                  enabled={available}
                  available={available}
                  selected={selectedHour === hour}
                  onPress={() => handleSelectedHour(hour)}
                >
                  <HourText available={available} selected={selectedHour === hour}>
                    {formattedHour}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(({hour, formattedHour, available}) => (
                <Hour
                  key={formattedHour}
                  style={styles.shadow}
                  enabled={available}
                  available={available}
                  selected={selectedHour === hour}
                  onPress={() => handleSelectedHour(hour)}
                >
                  <HourText available={available} selected={selectedHour === hour}>
                    {formattedHour}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
        </Schedule>
        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar horário</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </ScrollView>
    </Container>
  );
};

export default CreateAppointment;

import React, {useCallback, useMemo} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useRoute, useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import {Container, Description, OkButton, OkButtonText, Title} from './styles';
import responsivePixelSize from '../../utils/responsivePixelSize';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const {params} = useRoute();
  const {reset} = useNavigation();
  const {date} = params as RouteParams;

  const formattedDate = useMemo(() => {
    return format(date, "EEEE', dia' dd 'de' MMMM 'de' yyyy 'ás' HH:mm'h'", {
      locale: ptBr,
    });
  }, [date]);

  const handleEverythingOk = useCallback(() => {
    reset({
      routes: [{name: 'Dashboard'}],
      index: 0,
    });
  }, [reset]);

  return (
    <Container>
      <Feather name="check" size={Number(responsivePixelSize(80))} color="#04d361" />
      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>
      <OkButton onPress={handleEverythingOk}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;

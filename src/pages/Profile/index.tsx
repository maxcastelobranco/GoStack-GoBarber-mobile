import React, {useCallback, useRef} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View, TextInput, Alert} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';
import {Container, Title, UserAvatar, BackButton, UserAvatarButton, Header} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/apiClient';
import {useAuth} from '../../hooks/auth';
import responsivePixelSize from '../../utils/responsivePixelSize';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const {user, updateUser} = useAuth();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const {goBack} = useNavigation();

  const handleUpdateUser = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string().email('Digite um e-mail válido').required('Email é obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required(),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required(),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Senhas não batem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {name, email, old_password, password, password_confirmation} = data;

        const formData = {
          name,
          email,
          ...(data.old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        await updateUser(response.data);

        Alert.alert('Perfil atualizado!!', 'Suas informações foram atualizadas com sucesso.');

        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          'Erro ao atualizar os dados.',
          'Ocorreu um erro ao tentar atualizar os dados, tente novamente.',
        );
      }
    },
    [goBack, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione seu avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher foto da galeria',
      },
      (imagePickerResponse) => {
        if (imagePickerResponse.didCancel) return;

        if (imagePickerResponse.error) {
          Alert.alert('Erro ao escolher imagem', imagePickerResponse.error);
          return;
        }

        const {type, fileName, uri} = imagePickerResponse;

        const formData = new FormData();

        formData.append('avatar', {
          type,
          name: fileName,
          uri,
        });

        api
          .patch('/users/avatar', formData)
          .then((response) => updateUser(response.data))
          .then(() =>
            Alert.alert('Avatar atualizado!!', 'Suas informações foram atualizadas com sucesso.'),
          )
          .catch((err) => Alert.alert('Erro ao atualizar o avatar!!', err.message));
      },
    );
  }, [updateUser]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView contentContainerStyle={{flex: 1}} keyboardShouldPersistTaps="never">
        <Container>
          <Header>
            <BackButton onPress={goBack}>
              <Feather name="arrow-left" size={Number(responsivePixelSize(42))} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{uri: user.avatar_url}} />
            </UserAvatarButton>
          </Header>
          <View>
            <Title>Perfil</Title>
          </View>
          <Form initialData={user} onSubmit={handleUpdateUser} ref={formRef}>
            <Input
              name="name"
              icon="user"
              placeholder="Nome"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
            <Input
              ref={emailInputRef}
              name="email"
              icon="mail"
              placeholder="E-mail"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="newPassword"
              returnKeyType="next"
              onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
            />
            <Input
              ref={oldPasswordInputRef}
              name="old_password"
              icon="lock"
              placeholder="Senha atual"
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <Input
              containerStyle={{marginTop: Number(responsivePixelSize(16))}}
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Nova senha"
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />
            <Input
              ref={confirmPasswordInputRef}
              name="password_confirmation"
              icon="lock"
              placeholder="Confirmar senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button onPress={() => formRef.current?.submitForm()}>Confirmar mudanças</Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;

import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData({} as AuthState);
  }, []);
  const setupInvalidateSessionInterceptor = useCallback(async () => {
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const {response} = error;

        if (response.data.message === 'Invalid JWT token') {
          signOut();
        }

        return Promise.reject(error);
      },
    );
  }, [signOut]);
  const signIn = useCallback(
    async ({email, password}) => {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const {token, user} = response.data;

      await AsyncStorage.multiSet([
        ['@GoBarber:token', token],
        ['@GoBarber:user', JSON.stringify(user)],
      ]);

      api.defaults.headers.authorization = `Bearer ${token}`;

      await setupInvalidateSessionInterceptor();
      setData({token, user});
    },
    [setupInvalidateSessionInterceptor],
  );
  const loadStoredData = useCallback(async () => {
    const [token, user] = await AsyncStorage.multiGet(['@GoBarber:token', '@GoBarber:user']);

    if (token[1] && user[1]) {
      api.defaults.headers.authorization = `Bearer ${token[1]}`;
      await setupInvalidateSessionInterceptor();
      setData({token: token[1], user: JSON.parse(user[1])});
    }

    setLoading(false);
  }, [setupInvalidateSessionInterceptor]);
  const updateUser = useCallback(
    async (user: User) => {
      setData({
        token: data.token,
        user,
      });

      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
    },
    [data.token],
  );

  useEffect(() => {
    loadStoredData();
  }, [loadStoredData]);

  return (
    <AuthContext.Provider value={{user: data.user, signIn, signOut, loading, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthProvider, useAuth};

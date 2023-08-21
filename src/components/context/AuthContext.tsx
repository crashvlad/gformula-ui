import { ROUTES } from '@/config/routes';
import { useGetLoginUser, useLocalStorage } from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { type User } from '@/types';

interface TUserContext {
  user: null | User;
  isAuth: boolean;
  logout: () => void;
}

const AuthContext = createContext<TUserContext>({
  user: null,
  isAuth: false,
  logout: () => {},
});

interface AuthProviderProps extends PropsWithChildren {}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [, setToken, removeToken] = useLocalStorage('acc_token');
  const [user, setUser] = useState(null);
  const { data, isLoading, error } = useGetLoginUser();

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    queryClient.setQueryData(['login-user'], null);
    router.push(ROUTES.login);
  }, [queryClient, removeToken, router]);

  useEffect(() => {
    if (!isLoading && data && data.user) {
      setUser(data.user);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!isLoading && !data && error) {
      logout();
    }
  }, [error, isLoading, data, logout]);

  return (
    <AuthContext.Provider value={{ user, isAuth: Boolean(user), logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useUser() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Error auth context must be used within AuthProvider');
  }

  return authContext;
}

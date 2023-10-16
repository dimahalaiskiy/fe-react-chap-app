import React, { createContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoreApiProvider } from '../services/api';
import { User } from '../types';

interface AuthProvider {
  children: ReactNode;
}

export interface AuthContext {
  isAuthenticated: boolean | null | undefined;
  setIsAuthenticated: Dispatch<SetStateAction<boolean | null | undefined>>;
  userProfile: User;
  setUserProfile: Dispatch<SetStateAction<User>>;
}

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null | undefined>(null);

  const [userProfile, setUserProfile] = useState({ nickname: '', email: '', avatar: '' } as User);

  const navigate = useNavigate();

  const getUserSession = async () => {
    try {
      const { data } = await CoreApiProvider.protected();
      console.log('data', data);
      const { nickname, email, avatar } = data.user;
      setUserProfile({ nickname, email, avatar });
      setIsAuthenticated(true);
    } catch (error) {
      console.log('error', error);
      setIsAuthenticated(false);
      navigate('/login');
    }
  };
  useEffect(() => {
    getUserSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

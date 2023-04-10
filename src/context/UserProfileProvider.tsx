import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api/core';

interface UserProfileProviderI {
  children: ReactNode;
}

interface UserProfileI {
  nickname: string;
  isLoggedIn: boolean;
}

interface UserProfileContextI {
  userProfile: UserProfileI;
  setUserProfile: (userProfile: UserProfileI) => void;
}

export const UserProfileContext = createContext<UserProfileContextI | null>(
  null
);

export const UserProfileProvider: React.FC<UserProfileProviderI> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState({
    nickname: '',
    isLoggedIn: false,
  });

  const navigate = useNavigate();

  const getUserSession = async () => {
    try {
      const { data } = await api.post('/auth/protected');
      console.log('data', data);
    } catch (error) {
      setUserProfile({ nickname: '', isLoggedIn: false });
      navigate('/login');
    }
  };

  useEffect(() => {
    getUserSession();
  }, []);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

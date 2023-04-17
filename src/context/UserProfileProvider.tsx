import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api/core';

interface UserProfileProviderI {
  children: ReactNode;
}

interface UserProfileI {
  nickname: string;
}

interface UserProfileContextI {
  userProfile: UserProfileI;
  isLoggedIn: boolean;
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
  });
  const [isLoggedIn, setIsloggedIn] = useState(false);

  const navigate = useNavigate();

  const getUserSession = async () => {
    try {
      const { data } = await api.post('/auth/protected');
      setUserProfile(data.user.nickname);
      console.log('/protected data,', data);
      setIsloggedIn(true);
      navigate('/');
    } catch (error) {
      setIsloggedIn(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    getUserSession();
  }, []);

  return (
    <UserProfileContext.Provider
      value={{ userProfile, setUserProfile, isLoggedIn }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

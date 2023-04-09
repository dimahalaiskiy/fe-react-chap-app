import React, { createContext, ReactNode, useState } from 'react';

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

const UserProfileContext = createContext<UserProfileContextI | null>(null);

export const UserProfileProvider: React.FC<UserProfileProviderI> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState({
    nickname: '',
    isLoggedIn: false,
  });

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

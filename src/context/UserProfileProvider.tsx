import React, { createContext, ReactNode, useState } from "react";

interface UserProfileProviderI {
  children: ReactNode;
}

interface UserProfileI {
  nickname: string;
}

export interface UserProfileContextI {
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
    nickname: "",
  });

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

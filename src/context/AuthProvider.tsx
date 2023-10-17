import React, { createContext, ReactNode, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CoreApiProvider } from "../services/api";
import { User, AuthContext as IAuthContext } from "../types";

interface AuthProvider {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null | undefined>(null);
  const [userProfile, setUserProfile] = useState({ nickname: "", email: "", avatar: "" } as User);

  const navigate = useNavigate();

  const getUserSession = useCallback(async () => {
    try {
      const { data } = await CoreApiProvider.protected();
      const { nickname, email, avatar } = data.user;
      setUserProfile({ nickname, email, avatar });
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, []);

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

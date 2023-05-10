import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api/core";

interface AuthProvider {
  children: ReactNode;
}

export interface AuthContext {
  isAuthenticated: boolean | null | undefined;
  userProfile: {
    nickname: string;
    email: string;
  };
  setIsAuthenticated: Dispatch<SetStateAction<boolean | null | undefined>>;
}

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<
    boolean | null | undefined
  >(null);

  const [userProfile, setUserProfile] = useState({
    nickname: "",
    email: "",
  });

  const navigate = useNavigate();

  const getUserSession = async () => {
    try {
      const { data } = await api.post("auth/protected");
      if (data.user) {
        setUserProfile({
          nickname: data.user.nickname,
          email: data.user.email,
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("error", error);
      setIsAuthenticated(false);
      navigate("/login");
    }
  };
  useEffect(() => {
    getUserSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, ReactNode, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CoreApiProvider } from "@/services/api";
import { AuthContext as IAuthContext, User } from "@/types";

interface AuthProvider {
  children: ReactNode;
}

const defaultUserProfile: User = {
  id: "",
  username: "",
  displayName: "",
  email: "",
  avatar: "",
  password: "",
  createdAt: "",
  location: "",
};

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  user: defaultUserProfile,
  setIsAuthenticated: () => {},
  setUserProfile: () => {},
});

const unAuthRoutes = ["/login", "/register"];

export const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null | undefined>(null);
  const [user, setUserProfile] = useState<User>(defaultUserProfile);

  const location = useLocation();
  const navigate = useNavigate();

  const isUnAuthRoute = unAuthRoutes.includes(location.pathname);

  const getUserSession = useCallback(async () => {
    try {
      const { data } = await CoreApiProvider.me();
      const user = data.user;
      setUserProfile({
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        avatar: user.avatar,
        password: user.password,
        createdAt: user.createdAt,
        location: user.location,
      });
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (isUnAuthRoute) return;
    getUserSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        setUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

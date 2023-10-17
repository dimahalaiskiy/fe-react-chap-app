import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { AuthContext as IAuthContext } from "../../types";

interface PathRouteProps {
  children?: React.ReactNode;
}

export const PrivateRoute: React.FC<PathRouteProps> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext) as IAuthContext;

  if (isAuthenticated === null) return <></>;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

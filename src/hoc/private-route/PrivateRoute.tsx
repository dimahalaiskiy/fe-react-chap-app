import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface PathRouteProps {
  children?: React.ReactNode;
}

export const PrivateRoute: React.FC<PathRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) return <></>;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

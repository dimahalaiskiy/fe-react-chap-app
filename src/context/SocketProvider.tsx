import { createContext, ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socketService } from "@/services/socket/service";
import { useAuth } from "@/hooks/useAuth";

const SocketContext = createContext<Record<string, never>>({});

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      socketService.disconnect();
      return;
    }

    socketService.initialize(user.id, navigate);

    return () => {
      socketService.disconnect();
    };
  }, [isAuthenticated, user?.id]);

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => useContext(SocketContext);

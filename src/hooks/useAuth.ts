import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { AuthContext as IAuthContext } from "@/types";

export const useAuth = (): IAuthContext => {
  const authenticatedUser = useContext<IAuthContext>(AuthContext);
  return authenticatedUser;
};

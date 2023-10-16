import { Dispatch, SetStateAction } from 'react';

export interface User {
  nickname?: string;
  password?: string;
  email?: string;
  avatar?: string;
}

export interface AuthContext {
  isAuthenticated: boolean | null | undefined;
  setIsAuthenticated: Dispatch<SetStateAction<boolean | null | undefined>>;
  userProfile: User;
  setUserProfile: Dispatch<SetStateAction<User>>;
}

export interface QueryRequest {
  query: string;
  skip?: number;
  limit?: number;
}

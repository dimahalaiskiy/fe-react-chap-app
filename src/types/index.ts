import { Dispatch, SetStateAction } from "react";

export interface User {
  id: string;
  username: string;
  displayName: string | null;
  location: string | null;
  createdAt: string;
  password: string;
  email: string;
  avatar: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  displayName: string;
  location: string;
  password: string;
}

export interface ScrollPagination {
  skip: number | null;
  limit: number;
  total: number;
}

export interface UsersResponse {
  rows: User[] | [];
  pagination: ScrollPagination;
}

export interface AuthContext {
  isAuthenticated: boolean | null | undefined;
  user: User;
  setIsAuthenticated: Dispatch<SetStateAction<boolean | null | undefined>>;
  setUserProfile: Dispatch<SetStateAction<User>>;
}

export interface QueryRequest {
  query: string;
  skip?: number;
  limit?: number;
}

export enum EnvType {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

export enum UserStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}

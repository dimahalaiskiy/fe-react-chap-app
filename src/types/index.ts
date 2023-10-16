export interface User {
  nickname?: string;
  password?: string;
  email?: string;
  avatar?: string;
}

export interface QueryRequest {
  query: string;
  skip?: number;
  limit?: number;
}

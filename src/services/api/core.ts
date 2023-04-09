import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type AxiosConfig = AxiosRequestConfig & {
  baseURL: string | undefined;
};

const createAxiosInstance = (config: AxiosConfig): AxiosInstance => {
  return axios.create(config);
};

const api = createAxiosInstance({
  baseURL: process.env.API_URL || 'http://localhost:3001/api/v1',
});

export default api;

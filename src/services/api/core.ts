import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3002/api/v1',
  withCredentials: true,
});

axios.defaults.withCredentials = true;

export default axiosInstance;

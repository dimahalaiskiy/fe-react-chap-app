import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    process.env.API_URL || 'http://localhost:3001/api/v1',
  withCredentials: true,
});

export default axiosInstance;

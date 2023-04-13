import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    process.env.API_URL || 'https://react-chap-app.vercel.app/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'SameSite': 'None',
  }
});

export default axiosInstance;

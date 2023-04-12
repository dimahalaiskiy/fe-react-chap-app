import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    process.env.API_URL || 'https://react-chat-cod4-app.herokuapp.com/',
  withCredentials: true,
});

export default axiosInstance;

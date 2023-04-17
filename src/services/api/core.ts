import axios, { AxiosInstance } from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    process.env.API_URL ||
    'https://react-chat-cod4-app.herokuapp.com/api/v1',
  withCredentials: true,
  httpAgent: agent,
  headers: {
    'Content-Type': 'application/json',
    SameSite: 'none',
  },
});

export default axiosInstance;

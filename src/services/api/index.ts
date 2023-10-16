import { CoreConfigProvider } from './config';
import axios, { AxiosInstance } from 'axios';
import { QueryRequest, User } from '../../types';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axios.defaults.withCredentials = true;

export class CoreApiProvider {
  static register(user: User) {
    return axiosInstance.post(CoreConfigProvider.register(), user);
  }
  static protected() {
    return axiosInstance.post(CoreConfigProvider.protected());
  }
  static login(user: User) {
    return axiosInstance.post(CoreConfigProvider.login(), user);
  }
  static logout() {
    return axiosInstance.post(CoreConfigProvider.logout());
  }
  static uploadAvatar(avatar: FormData) {
    return axiosInstance.post(CoreConfigProvider.uploadAvatar(), avatar, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  static getUsers({ query, limit, skip }: QueryRequest) {
    return axiosInstance.get(CoreConfigProvider.getUsers({ query, limit, skip }));
  }
}

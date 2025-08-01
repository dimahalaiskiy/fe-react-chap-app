import { CoreConfigProvider } from "./config";
import axios, { AxiosInstance } from "axios";
import { QueryRequest, LoginRequest, RegisterRequest } from "@/types";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axios.defaults.withCredentials = true;

export class CoreApiProvider {
  static register(user: RegisterRequest) {
    return axiosInstance.post(CoreConfigProvider.register(), user);
  }

  static me() {
    return axiosInstance.post(CoreConfigProvider.me());
  }

  static login(credentials: LoginRequest) {
    return axiosInstance.post(CoreConfigProvider.login(), credentials);
  }

  static logout() {
    return axiosInstance.post(CoreConfigProvider.logout());
  }

  static uploadAvatar(avatar: FormData) {
    return axiosInstance.post(CoreConfigProvider.uploadAvatar(), avatar, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static changeNickname(nickname: string, id: string) {
    return axiosInstance.post(CoreConfigProvider.changeNickname(), { nickname, id });
  }

  static getUsers({ query, limit, skip }: QueryRequest) {
    return axiosInstance.get(CoreConfigProvider.getUsers({ query, limit, skip }));
  }

  static createChat({ userId }: { userId: string }) {
    return axiosInstance.post(CoreConfigProvider.createChat(), { userId });
  }

  static deleteChat({ chatId }: { chatId: string }) {
    return axiosInstance.delete(CoreConfigProvider.deleteChat({ chatId }));
  }

  static getChats() {
    return axiosInstance.get(CoreConfigProvider.getChats());
  }

  static getChat(chatId: string) {
    return axiosInstance.get(CoreConfigProvider.getChat({ chatId }));
  }

  static getMessages({ chatId, limit, skip }: { chatId: string; limit?: number; skip?: number }) {
    return axiosInstance.get(CoreConfigProvider.getMessages({ chatId, limit, skip }));
  }
}

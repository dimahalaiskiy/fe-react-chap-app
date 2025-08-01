import { QueryRequest } from "@/types";

export class CoreConfigProvider {
  static register() {
    return "/auth/register";
  }

  static me() {
    return "/auth/me";
  }

  static login() {
    return "/auth/login";
  }

  static logout() {
    return "/auth/logout";
  }

  static uploadAvatar() {
    return "/profile/avatar";
  }

  static changeNickname() {
    return "/profile/update";
  }

  static getUsers({ query, limit, skip }: QueryRequest) {
    const limitQueryParam = limit ? `&limit=${limit}` : "";
    const skipQueryParam = skip ? `&skip=${skip}` : "";
    const queryParams = [limitQueryParam, skipQueryParam].filter((param) => param !== "").join("&");
    return `/users?query=${query}${queryParams}`;
  }

  static getChats() {
    return "/chats";
  }

  static createChat() {
    return "/chats";
  }

  static deleteChat({ chatId }: { chatId: string }) {
    return `/chats/${chatId}`;
  }

  static getChat({ chatId }: { chatId: string }) {
    return `/chats/${chatId}`;
  }

  static getMessages({ chatId, limit, skip }: { chatId: string; limit?: number; skip?: number }) {
    const limitQueryParam = limit ? `?limit=${limit}` : "";
    const skipQueryParam = skip ? `&skip=${skip}` : "";
    const queryParams = [limitQueryParam, skipQueryParam].filter((param) => param !== "").join("&");
    return `/messages/${chatId}${queryParams}`;
  }
}

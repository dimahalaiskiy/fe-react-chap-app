import { QueryRequest } from '../../types';

export class CoreConfigProvider {
  static register() {
    return '/auth/register';
  }
  static protected() {
    return '/auth/protected';
  }
  static login() {
    return '/auth/login';
  }
  static logout() {
    return '/auth/logout';
  }
  static uploadAvatar() {
    return '/user/avatar';
  }
  static getUsers({ query, limit, skip }: QueryRequest) {
    const limitQueryParam = limit ? `&limit=${limit}` : '';
    const skipQueryParam = skip ? `&skip=${skip}` : '';
    const queryParams = [limitQueryParam, skipQueryParam].filter((param) => param !== '').join('&');
    return `/users?query=${query}${queryParams}`;
  }
}

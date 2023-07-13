import { LoginAPIInstance, DefaultAPIIstance } from "../index";

export const AuthAPI = {
  login(login, password) {
    const url = '/login';
    const data = {login, password};
    return LoginAPIInstance.post(url, data)
  },
  logout() {
    const url = '/logout'
    return DefaultAPIIstance.post(url)
  }
}
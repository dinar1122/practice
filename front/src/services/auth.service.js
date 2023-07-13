import axios from 'axios';
const API_URL = 'http://localhost:5000/api/auth/';
class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.login,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
  }
  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.login,
      password: user.password
    });
  }
}
export default new AuthService();
import http from './api.js'
import authHeader from './authHeader'
const API_URL = 'http://localhost:5000/api/test/'
class UserService {
  register(name, password) {
    return http
      .post('/user', {
        name,
        password,
      })
      .then((res) => {
        return res.data
      })
  }
  login(name, password) {
    return http
      .post('/user/login', {
        name,
        password,
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('user', JSON.stringify(res.data.token))
          localStorage.setItem('userInfo', JSON.stringify(res.data.user))
        }
        return res.data
      })
  }
  updateUsername(name, oldUsername) {
    return http
      .post('/user/updateUsername', {
        name,
        oldUsername,
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.user != null) {
          localStorage.setItem('userInfo', JSON.stringify(res.data.user))
        } else localStorage.setItem('userInfo', JSON.stringify(res.data))
        return res.data
      })
  }
  updatePassword(userId, newPassword, oldPassword, username) {
    console.log(newPassword, oldPassword, userId)
    return http.post('/user/updatePassword', {
      userId,
      newPassword,
      oldPassword,
      username,
    })
  }
  getUsername(id) {
    return http.post('/user/nameById', { id })
  }
  deleteUser(id) {
    return http.post('/user/delById', { id })
  }
}

export default new UserService()

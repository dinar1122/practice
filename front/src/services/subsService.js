import http from "./api.js"

class SubService {
  getSubsByUserId(userId) {
    return http.post('/subs', {userId})
  }
  subscribe(userId, categoryId) {
    return http.post('/subs/subscribe', {userId, categoryId})
  }
  unsubscribe(userId, categoryId) {
    return http.post('/subs/unsubscribe', {userId, categoryId})
  }
}
export default new SubService()
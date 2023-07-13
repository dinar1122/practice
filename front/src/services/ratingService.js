import http from './api.js'

class RatingService {
  getRating(postId) {
    return http.post('/rating', { postId })
  }
  createRating(postId, userId, ratingValue) {
    return http.post('/rating/create', { postId, userId, ratingValue })
  }
  incRate(postId, userId) {
    return http.post('/rating/inc', { postId, userId })
  }
  decRate(postId, userId) {
    return http.post('/rating/dec', { postId, userId })
  }
}
export default new RatingService()

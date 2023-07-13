import http from './api.js'
import authHeader from './authHeader.js'

class NewsService {
  getNews() {
    return http.get('/news')
  }
  getNewsByUserId(user_id) {
    return http.post('/news/byUserId', {user_id})
  }
  getNewsById(newsId) {
    return http.post('/news/byNewsId', {newsId})
  }
  getNewsByCategoryId(categoryId) {
    return http.post('/news/byCategoryId', {categoryId})
  }
  createPost(
    name, 
    content,
    user_id,
    category_id,
    description,
    picpreview,
    time,
    rating,
    news_id) {
    
    return http.post('/news', {
      name,
      content,
      user_id,
      category_id,
      description,
      picpreview,
      time,
      rating,
      news_id
    },
    { headers: authHeader() })
  }
  deletePost(postId) {
    return http.post('/news/delete', {postId})
  }
}
export default new NewsService()

import http from './api.js'

class CommentariesService {
  getComments(newsId) {
    return http.post('/comment', {newsId})
  }
  createComment(content, newsId, userId, date) {
    return http.post('/comment/create', {content, newsId, userId, date})
  }
  getCommentsById(userId) {
    return http.post('./comment/getById', {userId})
  }
  deleteCommentById(commentId) {
    return http.post('/comment/delById', {commentId})
  }
}
export default new CommentariesService()
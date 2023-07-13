const db = require('../../db')

class CommentService {
  async createComment(commentInfo) {
      commentInfo.date = new Date()
      await db.query('INSERT INTO commentaries(content, news_id, user_id, comment_date) VALUES(${content}, ${newsId}, ${userId}, ${date} )', commentInfo)
  }
  async getComment(newsId) {
      return await db.manyOrNone('SELECT * FROM commentaries WHERE news_id = $1', newsId)
  }
  async getCommentaries() {
      return await db.manyOrNone('SELECT * FROM commentaries')
  }
  async getCommentsById(userId) {
      return await db.manyOrNone('select * from commentaries where user_id = $1', userId)
  }
  async deleteCommentById(commentId) {
      console.log(commentId)
      return await db.manyOrNone('delete from commentaries where id = ${commentId}', commentId)
  }
}
module.exports = new CommentService
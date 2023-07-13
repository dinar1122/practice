const db = require('../../db')
const bcrypt = require('bcrypt')
const pgp = require('pg-promise')()
const genToken = require('../auth').genToken

class RatingService {
  async getRatingByNewsId(postId) {
    let news = await db.manyOrNone('SELECT * FROM rating WHERE news_id = $1', postId)
    return news
  }
  async incRating(voteInfo) {
    await db.oneOrNone('insert into users_votes(vote, user_id, news_id) values(true ,${userId}, ${postId})', voteInfo)
    await db.oneOrNone('update rating set rating = rating + 1  where news_id = $1', voteInfo.postId)
  }
  async decRating(voteInfo) {
    await db.oneOrNone('insert into users_votes(vote, user_id, news_id) values(false ,${userId}, ${postId})', voteInfo)
    await db.oneOrNone('update rating set rating = rating - 1  where news_id = $1', voteInfo.postId)
  }
}
module.exports = new RatingService()
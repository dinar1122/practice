const db = require('../../db')
const pgp = require('pg-promise')()

class NewsService {
  async getNews() {
    let news = await db.manyOrNone('SELECT * FROM news')

    news.forEach(
      (n) =>
        (n.picpreview = Buffer.from(n.picpreview, 'base64').toString('utf-8'))
    )

    return news
  }

  async getNewsByNewsId(id) {
    let news = await db.oneOrNone('SELECT * FROM news WHERE id = $1', id)
    let news1 = Buffer.from(news.picpreview, 'base64')
    news.picpreview = news1.toString('utf-8')
    return news
  }
  async getNewsByUserId(id) {
    var news = await db.manyOrNone('SELECT * FROM news WHERE user_id = $1', id)
    news.forEach(
      (n) =>
        (n.picpreview = Buffer.from(n.picpreview, 'base64').toString('utf-8'))
    )
    return news
  }
  async getNewsByCategoryId(CategoryId) {
    var news = await db.manyOrNone('select * from news where category_id = $1', CategoryId)
    console.log(news)
    
    return news
  }

  /**
   *
   * @param {News} news
   */
  async createNews(news) {
    news.time = new Date()
    let result = await db.oneOrNone(
      'INSERT INTO public.news(name, description, content, time, picpreview, user_id, category_id ) VALUES (${name}, ${description}, ${content}, ${time}, ${picpreview}, ${user_id}, ${category_id}) RETURNING id',
      news
    )
    news.news_id = result.id
    news.rating = 0
    console.log(news, news.news_id)
    await db.manyOrNone(
      'INSERT INTO rating(rating, news_id) VALUES(${rating}, ${news_id})',
      news
    )
    return result.id
  }
  async delete(postId) {
    await db.none('delete from news where id = ${postId}', postId)
  }
}

module.exports = new NewsService()

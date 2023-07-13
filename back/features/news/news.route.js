const express = require('express')
const router = express.Router()
const authenticateJWT = require('../auth').authenticateJWT
const newsService = require('./news.service')

router.get('/', async function (req, res) {
  let news = await newsService.getNews()
  res.json(news)
})

router.post('/byUserId', async function (req, res) {
  news = await newsService.getNewsByUserId(req.body.user_id)
  res.json(news)
})

router.post('/byNewsId', async function (req, res) {
  news = await newsService.getNewsByNewsId(req.body.newsId)
  res.json(news)
})

router.post('/byCategoryId', async function (req, res) {
  
  news = await newsService.getNewsByCategoryId(req.body.categoryId)
  console.log(news)
  res.json(news)
})

router.post('/', authenticateJWT, async function (req, res) {
  console.log(req.body)
  var id = await newsService.createNews(req.body)
  console.log('id публикации: ', id)
  var news = await newsService.getNewsByNewsId(id)
  res.json(news)
})
router.post('/delete', async function (req) {
  await newsService.delete(req.body)
})

module.exports = router

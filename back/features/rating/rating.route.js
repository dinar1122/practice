const express = require('express')
const ratingService = require('./rating.service')
const router = express.Router()

router.post('/', async function (req, res) {
  let newsRating = await ratingService.getRatingByNewsId(req.body.postId)
  res.json(newsRating)
})

router.post('/inc', async function (req) {
  await ratingService.incRating(req.body)
})
router.post('/dec', async function (req) {
  await ratingService.decRating(req.body)
})
module.exports = router
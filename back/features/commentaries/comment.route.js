const express = require('express')
const res = require('express/lib/response')
const commentService = require('./comment.service')
const router = express.Router()

const CommentService = require('./comment.service')

router.get('/', async function (req, res) {
  if (req.body.hasOwnProperty('news_id'))
    var comment = await commentService.getComment(req.body.content)
  var commentaries = await commentService.getCommentaries()
  res.json(commentaries)
})

router.post('/', async function (req, res) {
  var comment = await commentService.getComment(req.body.newsId)
  console.log(comment)
  res.json(comment)
})
router.post('/create', async function (req, res) {
  console.log(req.body)
  await commentService.createComment(req.body)
})
router.post('/getById', async function (req,res){
  var comment = await commentService.getCommentsById(req.body.userId)
  res.json(comment)
})
router.post('/delById', async function (req) {
  await commentService.deleteCommentById(req.body)
})
module.exports = router

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const app = express()
const port = 5000

app.use(cors())
app.use(logger('dev'))
app.use(express.json({ limit: 1000000000 }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/news', require('./features/news/news.route'))
app.use('/category', require('./features/category/category.route'))
app.use('/comment', require('./features/commentaries/comment.route'))
app.use('/user', require('./features/users/user.route'))
app.use('/rating', require('./features/rating/rating.route'))
app.use('/subs', require('./features/subs/subs.route'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

;('use strict')
const DB = require('./db')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
}
app.use(allowCrossDomain)

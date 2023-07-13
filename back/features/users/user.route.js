const express = require('express')
const newsService = require('../news/news.service')
const userService = require('./user.service')
const router = express.Router()

router.get('/', async function (req, res) {
  if (req.body.hasOwnProperty('name')) {
    var user = await userService.getUser(req.body.name)
    res.json(user)
  }

  var users = await userService.getUsers()
  res.json(users)
})

router.post('/nameById', async function (req, res) {
  var username = await userService.getUsername(req.body.id)
  res.json(username)
})

router.post('/', async function (req, res) {
  var user = await userService.getUser(req.body.name)
  if (user != null) {
    var e = 'Такой пользователь уже есть'
    res.json(e)
  } else await userService.createUser(req.body.name, req.body.password)

  res.json(user)
})
router.post('/updateUsername', async function (req, res) {
  if ((await userService.getUser(req.body.name)) == null) {
    await userService.updateUsername(req.body)
    var user = await userService.getUser(req.body.name)
    var e = 'Имя пользователя успешно обновлено'
    res.json({ user, e })
  } else {
    var user = await userService.getUser(req.body.oldUsername)
    var e = 'Имя пользователя уже кем-то занято'
    res.json({ user, e })
  }
})
router.post('/updatePassword', async function (req, res) {
  const e = await userService.updatePassword(req.body)
  
  res.json({e})
})
router.post('/delById', async function (req) {
  console.log(req.body)
  await userService.deleteUser(req.body)
})

router.post('/login', async function (req, res) {
  var user = await userService.getUser(req.body.name)
  if (user == null) {
    var e = 'Такого пользователя нет'
    res.json({ token, user, e })
  } else {
    var token = await userService.login(req.body.name, req.body.password)
    if (token == null) {
      var e = 'Неверный пароль'
      res.json({ token, user, e })
    } else console.log(token)
    res.json({ token, user })
  }
})



module.exports = router

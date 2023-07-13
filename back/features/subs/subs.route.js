const express = require('express')
const subsService = require('./subs.service')

const router = express.Router()

router.post('/', async function (req, res) {
  let subs = await subsService.getSubsByUserId(req.body.userId)
  res.json(subs)
})
router.post('/subscribe', async function(req, res) {
  await subsService.subscribe(req.body)
})
router.post('/unsubscribe', async function(req, res) {
  console.log(req.doby)
  await subsService.unsubscribe(req.body)
})

module.exports = router
const express = require('express')
const router = express.Router()

const categoryService = require('./category.service')

router.get('/', async function (req, res) {
  if (req.body.hasOwnProperty('name')) {
    var category = await categoryService.getCategory(req.body.name);
    res.json(category)
  }
  var categories = await categoryService.getCategories()
  res.json(categories)
})

router.post('/', async function (req, res) {
  await categoryService.createCategory(req.body.name)
  var category = await categoryService.getCategory(req.body.name)
  res.json(category)
})
router.post('/categoryById', async function (req, res) {
  var categoryName = await categoryService.getCategoryById(req.body.category_id)
  res.json(categoryName)
})

module.exports = router

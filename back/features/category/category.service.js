const db = require('../../db')

class CategoryService {
  async createCategory(name) {
    await db.query('INSERT INTO categories(name) VALUES($1)', name)
  }

  async getCategory(name) {
    return await db.oneOrNone('SELECT * FROM categories WHERE name = $1', name)
  }
  async getCategoryById(id) {
    return await db.oneOrNone('SELECT * FROM categories WHERE id = $1', id)
  }
  async getCategories() {
    return await db.manyOrNone('SELECT * FROM categories')
  }
}

module.exports = new CategoryService()

const db = require('../../db')
const bcrypt = require('bcrypt')
const pgp = require('pg-promise')()
const genToken = require('../auth').genToken

class SubService {
  async getSubsByUserId(userId) {
    let subs = await db.manyOrNone('select * from subs where user_id = $1', userId)
    return subs
  }
  async subscribe(subsInfo) {
    await db.manyOrNone('insert into subs(user_id, category_id) values(${userId}, ${categoryId})', subsInfo)
  }
  async unsubscribe(subsInfo) {
    await db.manyOrNone('delete from subs where user_id = ${userId} and category_id = ${categoryId}', subsInfo)
  }
}
module.exports = new SubService()
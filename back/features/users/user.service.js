const db = require('../../db')
const bcrypt = require('bcrypt')
const pgp = require('pg-promise')()
const genToken = require('../auth').genToken
const salt = 10

class UserService {
  async createUser(name, password) {
    const hash = bcrypt.hashSync(password, salt)
    const query = pgp.helpers.insert(
      { name: name, password: hash, reg_date: new Date() },
      null,
      'users'
    )

    await db.query(query)
  }
  async getUser(name) {
    return await db.oneOrNone('select * from users where name = $1', name)
  }
  async getUsername(id) {
    return await db.oneOrNone('select * from users where id = $1', id)
  }
  async getUsers() {
    return await db.manyOrNone('SELECT * FROM users')
  }
  async updateUsername(userInfo) {
    console.log(userInfo)
    return await db.manyOrNone(
      'update users set name = ${name} where name = ${oldUsername}',
      userInfo
    )
  }
  async deleteUser(userId) {
    console.log(userId)
    return await db.manyOrNone('delete from users where id = ${id}', userId)
  }
  async updatePassword(userInfo) {
    console.log('service', userInfo.newPassword)
    const user = await this.getUser(userInfo.username)
    let comparePassword = await bcrypt.compare(
      userInfo.oldPassword,
      user.password
    )
    if (!comparePassword) {
      const e = 'Старый пароль не верный'
      console.log(e)
      return e
    } else {
      const hash = bcrypt.hashSync(userInfo.newPassword, salt)
      userInfo.hash = hash
      await db.manyOrNone(
        'update users set password = ${hash} where id = ${userId}',
        userInfo
      )
      const e = 'Пароль успешно обновлен'
      return e 
    }
  }
  async login(name, password) {
    const user = await this.getUser(name)
    if (!user) {
      const e = 'Похоже, такого пользователя еще нет'
      return e
    }
    let comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) {
      const e = null
      return e
    }
    const token = genToken(user.id, user.name)
    return token
  }
 

  async checking(id, name) {
    const token = genToken(id, name)
    return { token: token, id: id, name: name }
  }
}

module.exports = new UserService()

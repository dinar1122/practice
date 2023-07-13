 USERNAME = "postgres"
const PASSWORD = "postgres"
const HOST = "localhost"
const PORT = "5432"
const DATABASE = "DB_NB1"

const CONNECTION_STRING = `postgres://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`

const pgp = require('pg-promise')()
const db = pgp(CONNECTION_STRING)

module.exports = db
"use strict";

class Db {
  constructor(file) {
    this.db = new postgresql.Database(file);
    this.createTable()
  }
  createTable() {
    const postgres = `
      CREATE TABLE IF NOT EXISTS user (
        id integer PRIMARY KEY, 
        name text, 
        email text UNIQUE, 
        user_pass text,
        is_admin integer)`
    return this.db.run(postgres);
  }
  selectByName(name, callback) {
    return this.db.get(
      `SELECT * FROM user WHERE name = ?`,
      [name],function(err,row){
          callback(err,row)
      })
  }
  insertAdmin(user, callback) {
    return this.db.run(
      'INSERT INTO user (name,email,user_pass,is_admin) VALUES (?,?,?,?)',
      user, (err) => {
          callback(err)
      })
  }
  selectAll(callback) {
    return this.db.all(`SELECT * FROM user`, function(err,rows){
      callback(err,rows)
    })
  }
  insert(user, callback) {
    return this.db.run(
      'INSERT INTO user (name,email,user_pass) VALUES (?,?,?)',
      user, (err) => {
          callback(err)
      })
  }
}

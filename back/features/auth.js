const jwt = require('jsonwebtoken')
const SECRET_KEY = 'f3eqwasrf'
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }
      next()
    })
  } else {
    res.sendStatus(401)
  }
}

const genToken = (id, name) => {
  return jwt.sign(
    {
      id,
      name,
    },
    SECRET_KEY,
    {
      expiresIn: '24h',
    }
  )
}
module.exports = { genToken, authenticateJWT }

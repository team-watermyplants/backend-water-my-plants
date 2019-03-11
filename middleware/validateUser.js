require('dotenv-safe').config()

const jwt = require('jsonwebtoken')
const util = require('util')

const jwtVerifyAsync = util.promisify(jwt.verify)

function validateUser (req, res, next) {
  const { token } = req.session
  if (!token) {
    return res.status(401).json({ error: 'you shall not pass!! - no token' })
  }

  jwtVerifyAsync(token, process.env.JWT_SECRET)
    .then(tokenPayload => {
      req.decodedToken = tokenPayload
      next()
    })
    .catch(err =>
      res
        .status(401)
        .json({ error: 'you  shall not pass!! - token invalid', err })
    )
}

module.exports = validateUser

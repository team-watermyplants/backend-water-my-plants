require('dotenv-safe').config()
const jwt = require('jsonwebtoken')

//* Generate token
module.exports = ({ id, email }) => {
  const payload = {
    id,
    email
  }
  const options = {
    expiresIn: '30m'
  }
  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

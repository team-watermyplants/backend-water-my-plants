require('dotenv').config()
module.exports = {
  name: 'this-is-not-a-cookie',
  secret: process.env.COOKIE_SECRET,
  maxAge: 1000 * 60 * 15
}

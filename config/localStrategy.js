require('dotenv-safe').config()
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')
const db = require('../data/db')

module.exports = {
  verifyCallback: (req, email, password, done) => {
    db('local')
      .where({ email })
      .first()
      .then(local => {
        if (!local) {
          return done(null, false)
        }
        bcrypt.compare(password, local.password).then(isValid => {
          if (isValid) {
            db('user').where({ localId: local.id }).first().then(user => {
              const token = generateToken(user)
              req.session.token = token
              return done(null, user)
            })
          } else {
            return done(null, false)
          }
        })
      })
      .catch(err => done(err))
  }
}

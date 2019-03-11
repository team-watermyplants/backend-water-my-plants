require('dotenv-safe').config()
const uuid = require('uuid/v4')
const db = require('../data/db')

module.exports = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CB,
  verifyCallback: (accessToken, refreshToken, profile, done) => {
    const {
      id,
      name: { givenName, familyName },
      displayName,
      emails,
      photos
    } = profile
    const email = emails[0].value
    const photo = photos[0].value
    db('google').where({ id }).first().then(gUser => {
      if (gUser && gUser.id) {
        db('user')
          .where({ googleId: gUser.id })
          .first()
          .then(user => done(null, user))
      } else {
        const newUser = {
          id,
          givenName,
          familyName,
          displayName,
          email,
          photo
        }
        db('google')
          .insert(newUser)
          .returning('*')
          .then(inserted => {
            const gUser = inserted[0]
            db('user').where({ email: gUser.email }).first().then(user => {
              if (user && user.id) {
                db('user')
                  .where({ email: gUser.email })
                  .update({ googleId: gUser.id })
                  .returning('*')
                  .then(user => {
                    user = user[0]
                    done(null, user)
                  })
              } else {
                const user = {
                  id: uuid(),
                  displayName: newUser.displayName,
                  email: newUser.email,
                  photo: newUser.photo,
                  googleId: gUser.id
                }
                db('user').insert(user).returning('*').then(user => {
                  user = user[0]
                  done(null, user)
                })
              }
            })
          })
          .catch(err => done(err, false))
      }
    })
  }
}

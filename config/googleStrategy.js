require('dotenv').config()
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
    db('google')
      .where({ id })
      .first()
      .then(user => {
        if (user && user.id) {
          return done(null, user)
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
            .then(id =>
              done(null, { id, givenName, familyName, emails, photo })
            )
            .catch(err => done(err, false))
        }
      })
  }
}

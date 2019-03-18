require('dotenv').config()
const db = require('../data/db')

module.exports = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CB,
  profileFields: ['id', 'displayName', 'name', 'emails', 'photos'],
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

    db('facebook')
      .where({ id })
      .first()
      .then(user => {
        if (user && user.id) {
          db('user_details')
            .where({ facebookId: user.id })
            .first()
            .then(userDetails => done(null, user))
        } else {
          const newUser = {
            id,
            givenName,
            familyName,
            displayName,
            email,
            photo
          }
          db('facebook')
            .insert(newUser)
            .then(id => done(null, newUser))
            .catch(err => done(err, false))
        }
      })
  }
}

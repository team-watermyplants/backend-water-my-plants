require('dotenv-safe').config()
const uuid = require('uuid/v4')
const db = require('../data/db')

module.exports = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CB,
  profileFields: [ 'id', 'displayName', 'name', 'emails', 'photos' ],
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

    db('facebook').where({ id }).first().then(fbUser => {
      if (fbUser && fbUser.id) {
        db('user')
          .where({ facebookId: fbUser.id })
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
        db('facebook')
          .insert(newUser)
          .returning('*')
          .then(inserted => {
            const fbUser = inserted[0]
            db('user').where({ email: fbUser.email }).first().then(user => {
              if (user && user.id) {
                db('user')
                  .where({ email: fbUser.email })
                  .update({ facebookId: fbUser.id })
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
                  facebookId: fbUser.id
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

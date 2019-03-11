require('dotenv-safe').config()
const uuid = require('uuid/v4')
const db = require('../data/db')

module.exports = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CB,
  verifyCallback: (accessToken, refreshToken, profile, done) => {
    const { id, username, displayName, emails, photos } = profile
    const email = emails[0].value
    const photo = photos[0].value
    db('github').where({ id }).first().then(ghUser => {
      if (ghUser && ghUser.id) {
        db('user')
          .where({ githubId: ghUser.id })
          .first()
          .then(user => done(null, user))
      } else {
        const newUser = {
          id,
          username,
          displayName,
          email,
          photo
        }
        db('github')
          .insert(newUser)
          .returning('*')
          .then(inserted => {
            const ghUser = inserted[0]
            db('user').where({ email: ghUser.email }).first().then(user => {
              if (user && user.id) {
                db('user')
                  .where({ email: ghUser.email })
                  .update({ githubId: ghUser.id })
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
                  githubId: ghUser.id
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

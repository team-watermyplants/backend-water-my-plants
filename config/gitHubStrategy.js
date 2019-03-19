require('dotenv').config()
const db = require('../data/dbConfig')

module.exports = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  // callbackURL: process.env.GITHUB_CB,
  verifyCallback: (accessToken, refreshToken, profile, done) => {
    const {
      id: githubId,
      username,
      displayName: firstName,
      emails,
      photos,
    } = profile
    const email = emails[0].value
    const photo = photos[0].value

    const newUser = {
      profileURL: photo,
      username,
      firstName,
    }
    findOrCreate(newUser, done)
  },
}

//* Signature from Sequelize ORM
function findOrCreate (newUser, done) {
  db('users').where({ username: newUser.username }).first().then(user => {
    if (user && user.id) {
      return done(null, user)
    } else {
      db('users')
        .insert(newUser)
        .returning('*')
        .then(inserted => done(null, inserted))
        .catch(err => done(err, false))
    }
  })
}

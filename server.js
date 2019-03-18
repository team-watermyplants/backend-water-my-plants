require('dotenv').config()
const path = require('path')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const server = express()
const db = require('./data/dbConfig')
const config = require('./config')
const plantsRoute = require('./routes/plants/Plants')
const usersRoute = require('./routes/users/Users')
const notificationsRoute = require('./routes/notifications/Notifications')
const auth = require('./auth/auth')

const smsWorker = require('./twilio/Cron')
const redirectURL = `${process.env.CLIENT_URL}/login`

const {
  checkLogin,
  findUser,
  checkPassword,
  checkRegistration,
  hashPassword,
} = require('./middleware/Middleware')

config.passportConfig(passport)

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(passport.initialize())
server.use(passport.session())

// viewed at http://localhost:8080
server.get('/landing', function (req, res) {
  res.sendFile(path.join(__dirname + '/landing/index.html'))
})

server.use('/api/plants', plantsRoute)
server.use('/api/users', usersRoute)
server.use('/api/notifications', notificationsRoute)

server.post(
  '/auth/login',
  checkLogin,
  findUser,
  checkPassword,
  async (req, res) => {
    if (req.user) {
      let token = auth.generateToken(req.user)
      res.status(200).json({ user: req.user, token })
    }
  }
)

server.post('/auth/register', checkRegistration, hashPassword, (req, res) => {
  const { firstName, lastName, username, password, phoneNumber } = req.body
  db('users')
    .insert({ firstName, lastName, username, password, phoneNumber })
    .returning('*')
    .then(user => {
      if (user) {
        let token = auth.generateToken(user)
        res.status(201).json({
          user: user[0],
          token,
        })
      } else {
        res.status(400).json({ message: 'something wrong with user input' })
      }
    })
    .catch(err => res.status(500).json(err))
})

//* GitHub OAuth
server.get('/auth/github', passport.authenticate('github'))
server.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: redirectURL,
  }),
  socialLogin
)

function socialLogin (req, res, next) {
  res.redirect(`${process.env.CLIENT_URL}/users`)
}

// smsWorker.start();

module.exports = server

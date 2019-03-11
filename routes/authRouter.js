require('dotenv-safe').config()
const db = require('../data/db')
const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4')
const router = require('express').Router()
const passport = require('passport')
const redirectURL = `${process.env.CLIENT_URL}/signin`

//* Import Utils/Middleware
const generateToken = require('../utils/generateToken')
const checkCredentials = require('../middleware/checkCredentials')

//* Email/Password-Hash Strategy
router.post(
  '/register',
  checkCredentials,
  register,
  passport.authenticate('local'),
  login
)
router.post('/login', checkCredentials, passport.authenticate('local'), login)

//* Destroy cookie session & req.user
router.get('/logout', logout)

//* GitHub OAuth
router.get('/github', passport.authenticate('github'))
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: redirectURL
  }),
  socialLogin
)

//* Facebook OAuth
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: [ 'email' ] })
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: redirectURL
  }),
  socialLogin
)

// //* Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: [ 'profile', 'email' ] })
)
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: redirectURL
  }),
  socialLogin
)

//* Route Handlers
function register (req, res, next) {
  const { email, password } = req.body
  const local = { email, password }
  local.password = bcrypt.hashSync(password, Number(process.env.HASH_ROUNDS))
  local.id = uuid()
  db('local')
    .insert(local)
    .returning('*')
    .then(insertedLocal => {
      const local = insertedLocal[0]
      db('user').where({ email: local.email }).first().then(user => {
        if (user && user.id) {
          db('user')
            .where({ email: local.email })
            .update({ localId: local.id })
            .then(user => {
              const token = generateToken(user)
              req.session.token = token
              next()
              // res.status(201).json({ msg: 'Registration Successful!' })
            })
        } else {
          const user = {
            id: uuid(),
            displayName: email.split('@')[0],
            localId: insertedLocal[0].id,
            email
          }
          db('user').insert(user).returning('*').then(user => {
            const token = generateToken(user)
            req.session.token = token
            next()
            // res.status(201).json({ msg: 'Registration Successful!' })
          })
        }
      })
    })
    .catch(next)
}

function login (req, res, next) {
  if (req.user) {
    res.status(200).json({ msg: 'login successful' })
  } else {
    res.status(401).json({ msg: 'login failed' })
  }
}

function logout (req, res, next) {
  req.session = null
  req.logout()
  res.status(200).json({ msg: 'all okay' })
}

function socialLogin (req, res, next) {
  const token = generateToken(req.user)
  req.session.token = token
  res.redirect(`${process.env.CLIENT_URL}/users`)
}

module.exports = router

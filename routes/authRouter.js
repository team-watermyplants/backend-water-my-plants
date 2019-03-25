require('dotenv').config()

const express = require('express')
const router = express.Router()
const passport = require('passport')
const { generateToken } = require('../helpers')

const db = require('../data/db')
const {
  checkLogin,
  findUser,
  checkPassword,
  checkRegistration,
  hashPassword,
} = require('../middleware/auth')

const redirectURL = `${process.env.CLIENT_URL}/login`

router.post('/login', checkLogin, findUser, checkPassword, async (req, res) => {
  if (req.user) {
    let token = generateToken(req.user)
    res.status(200).json({ user: req.user, token })
  }
})

router.post('/register', checkRegistration, hashPassword, (req, res) => {
  const { firstName, lastName, username, password, phoneNumber } = req.body
  db('users')
    .insert({ firstName, lastName, username, password, phoneNumber })
    .returning('*')
    .then(user => {
      if (user) {
        let token = generateToken(user)
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
router.get('/github', passport.authenticate('github'))

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: redirectURL,
  }),
  socialLogin
)

//* Facebook OAuth
router.get('/facebook', passport.authenticate('facebook'))

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: redirectURL,
  }),
  socialLogin
)

//* Google OAuth
router.get('/google', passport.authenticate('google'))

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: redirectURL,
  }),
  socialLogin
)

//* current_user route

router.get('/current_user', (req, res) => {
  console.log('\n 🦄', req.user)
  console.log('\n 😫', req.session)
  const { user } = req
  if (user) {
    res.status(200).json(user)
  }
})

module.exports = router

function socialLogin(req, res, next) {
  const user = req.user
  const token = generateToken(user)
  console.log('\n req.user', req.user)
  //? Send token in query string to save to localStorage on frontend?
  //? Ask Luis what to do?
  res.redirect(`${process.env.CLIENT_URL}/?token=${token}&userId=${user.id}`)
}

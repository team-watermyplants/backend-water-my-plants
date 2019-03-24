require('dotenv').config()

const express = require('express')
const router = express.Router()
const passport = require('passport')
const auth = require('../auth/auth')
const db = require('../data/dbConfig')
const {
  checkLogin,
  findUser,
  checkPassword,
  checkRegistration,
  hashPassword,
} = require('../middleware/Middleware')

const redirectURL = `${process.env.CLIENT_URL}/login`

router.post('/login', checkLogin, findUser, checkPassword, async (req, res) => {
  if (req.user) {
    let token = auth.generateToken(req.user)
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
router.get('/github', passport.authenticate('github'))
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: redirectURL,
  }),
  socialLogin
)

function socialLogin(req, res, next) {
  const user = req.user
  const token = auth.generateToken(user)
  console.log('\n req.user', req.user)
  //? Send token in query string to save to localStorage on frontend?
  //? Ask Luis what to do?
  res.redirect(`${process.env.CLIENT_URL}/?token=${token}&userId=${user.id}`)
}

module.exports = router

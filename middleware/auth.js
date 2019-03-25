require('dotenv').config()

const bcrypt = require('bcryptjs')

const db = require('../data/db')

//REGISTRATION MIDDLEWARE

function checkRegistration (req, res, next) {
  if (
    !req.body.username ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.phoneNumber ||
    !req.body.password
  ) {
    res
      .status(400)
      .json({ message: 'Please enter information for all required fields.' })
  } else {
    next()
  }
}

function hashPassword (req, res, next) {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    Number(process.env.HASH_ROUNDS)
  )
  next()
}

//LOGIN MIDDLEWARE

function checkLogin (req, res, next) {
  if (req.body.username && req.body.password) {
    next()
  } else {
    res.status(400).json({ message: 'Please enter a username and password.' })
  }
}

async function findUser (req, res, next) {
  let user = await db('users').where({ username: req.body.username }).first()

  if (!user) {
    res
      .status(404)
      .json({ message: "Can't find that username in our database" })
  } else {
    req.user = user
    next()
  }
}

function checkPassword (req, res, next) {
  if (req.user && bcrypt.compareSync(req.body.password, req.user.password)) {
    next()
  } else {
    res.status(401).json({ message: 'Incorrect password' })
  }
}

module.exports = {
  checkRegistration,
  checkLogin,
  checkPassword,
  findUser,
  hashPassword,
}

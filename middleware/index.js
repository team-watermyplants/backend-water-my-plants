const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const cookie = require('cookie-session')
const passport = require('./passport')

const config = require('../config')

module.exports = server => {
  server.use(cors(config.corsWhitelistWithCredentials))
  server.use(helmet())
  server.use(logger('dev'))
  server.use(express.json())
  server.use(cookie(config.cookieSession))
  server.use(rateLimit(config.rateLimit))
  server.use(passport.initialize())
  server.use(passport.session())
}

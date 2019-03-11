const config = require('../config')
//* Third-party middleware
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const cookieSession = require('cookie-session')
const RateLimit = require('express-rate-limit')
const passport = require('passport')
const rateLimit = new RateLimit(config.rateLimit)

config.passportConfig(passport)

module.exports = server => {
  server.use(express.json())
  server.use(logger('dev'))
  server.use(helmet())
  server.use(cors(config.corsWhitelistWithCredentials))
  server.use(cookieSession(config.cookieSession))
  server.use(rateLimit)
  server.use(passport.initialize())
  server.use(passport.session())
}

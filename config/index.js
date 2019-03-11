const corsWhitelistWithCredentials = require('./corsWhitelistWithCredentials')
const cookieSession = require('./cookieSession')
const rateLimit = require('./rateLimit')
const passportConfig = require('./passportConfig')
const localStrategy = require('./localStrategy')
const gitHubStrategy = require('./gitHubStrategy')
const googleStrategy = require('./googleStrategy')
const facebookStrategy = require('./facebookStrategy')

module.exports = {
  corsWhitelistWithCredentials,
  cookieSession,
  rateLimit,
  passportConfig,
  localStrategy,
  gitHubStrategy,
  googleStrategy,
  facebookStrategy
}

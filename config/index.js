const cookieSession = require('./cookieSession')
const rateLimit = require('./rateLimit')
const corsWhitelistWithCredentials = require('./corsWhitelistWithCredentials')
const gitHubStrategy = require('./gitHubStrategy')
const googleStrategy = require('./googleStrategy')
const facebookStrategy = require('./facebookStrategy')

module.exports = {
  cookieSession,
  rateLimit,
  gitHubStrategy,
  googleStrategy,
  facebookStrategy,
  corsWhitelistWithCredentials,
}

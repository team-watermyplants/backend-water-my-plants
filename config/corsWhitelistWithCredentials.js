require('dotenv-safe').config()

module.exports = { origin: process.env.CLIENT_URL, credentials: true }

const server = require('express')()
const errorHandler = require('./utils/errorHandler')
const smsWorker = require('./twilio/cron')

//* Middleware & Routes
require('./middleware')(server)
require('./routes')(server)

//* Error Handler
server.use(errorHandler)

smsWorker.start()
module.exports = server

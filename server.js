require('dotenv').config()
const server = require('express')()

const smsWorker = require('./twilio/Cron')

require('./middleware')(server)
require('./routes')(server)

//* CRON Scheduler
// smsWorker.start();

module.exports = server

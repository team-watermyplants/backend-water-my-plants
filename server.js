require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const server = express()
const config = require('./config')
const logger = require('morgan')
const plantsRoute = require('./routes/Plants')
const usersRoute = require('./routes/Users')
const notificationsRoute = require('./routes/Notifications')
const authRouter = require('./routes/authRouter')
const auth = require('./auth/auth')

const smsWorker = require('./twilio/Cron')

config.passportConfig(passport)

server.use(cors())
server.use(helmet())
server.use(logger('dev'))
server.use(express.json())
server.use(passport.initialize())
server.use(passport.session())

server.use('/auth', authRouter)
server.use('/api/plants', plantsRoute)
server.use('/api/users', usersRoute)
server.use('/api/notifications', notificationsRoute)

// smsWorker.start();

module.exports = server

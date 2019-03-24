const plantsRouter = require('./plantsRouter')
const usersRouter = require('./usersRouter')
const notificationsRouter = require('./notificationsRouter')
const authRouter = require('./authRouter')

module.exports = server => {
  server.use('/auth', authRouter)
  server.use('/api/plants', plantsRouter)
  server.use('/api/users', usersRouter)
  server.use('/api/notifications', notificationsRouter)
}

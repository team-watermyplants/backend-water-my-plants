const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const plantRouter = require('./plantRouter')
const wateringRouter = require('./wateringRouter')

module.exports = server => {
  server.use('/auth', authRouter)
  server.use('/api/users', userRouter)
  server.use('/api/plants', plantRouter)
  server.use('/api/watering', wateringRouter)
}

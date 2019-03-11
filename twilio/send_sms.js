require('dotenv-safe').config()

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

module.exports = {
  sendMessage: notification => {
    client.messages
      .create({
        body: `Hi ${notification.displayName}! It's time (${notification.wateringTime}) to water your plant (${notification.name}) located (${notification.location})`,
        from: process.env.TWILIO_NUMBER,
        to: process.env.TEST_NUMBER
      })
      .then(message => console.log(message))
      .catch(err => console.error(err))
  }
}

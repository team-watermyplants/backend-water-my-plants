require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports = {
  sendMessage: notification => {
    client.messages
      .create({
        body: `Hi ${notification.firstName}! It's time (${
          notification.notificationTime
        }) to water your plant (${notification.name}) located (${
          notification.location
        })`,
        from: process.env.TWILIO_NUMBER,
        to: notification.phoneNumber
      })
      .then(message => console.log(message))
      .catch(err => console.error(err));
  }
};

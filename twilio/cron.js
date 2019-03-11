const cron = require('node-cron')
const moment = require('moment')
const { sendMessage } = require('./send_sms')
const db = require('../data/db')

const smsWorker = cron.schedule(
  '00 * * * * *',
  () => {
    db('watering as w')
      .join('plant as p', 'w.plantId', 'p.id')
      .join('user as u', 'u.id', 'p.userId')
      .where({ textSent: false })
      .andWhereBetween('wateringTime', [
        moment().format(),
        moment().add(59, 'seconds').format()
      ])
      .select('w.id', 'u.displayName', 'p.name', 'p.location', 'w.wateringTime')
      .then(notifications => {
        console.log('\n NOTIFICATIONS', notifications)
        if (notifications.length > 0) {
          notifications.forEach(notification => {
            sendMessage(notification)
            db('watering')
              .where({ id: notification.id })
              .update({ textSent: true })
              .then(updated => console.log('\nUPDATED', updated))
          })
        }
      })
  },
  {
    scheduled: false
  }
)

module.exports = smsWorker

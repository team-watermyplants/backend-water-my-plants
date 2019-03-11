const moment = require('moment-timezone')
const faker = require('faker')

const users = []
const timeZone = moment.tz.names()

for (let i = 0; i < 100; i++) {
  const randomTimeZone = Math.floor(Math.random() * timeZone.length)
  const user = {
    id: faker.random.uuid(),
    displayName: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(2),
    photo: faker.image.imageUrl(),
    timeZone: timeZone[randomTimeZone]
  }
  users.push(user)
}

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del().then(function () {
    // Inserts seed entries
    return knex('user').insert(users)
  })
}

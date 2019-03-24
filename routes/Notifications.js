const express = require('express')
const router = express.Router()

const db = require('../data/dbConfig')

router.get('/', async (req, res) => {
  let notifications = await db('notifications')
  res.status(200).json(notifications)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  db('notifications')
    .where({ userId: id })
    .then(notification => {
      if (notification.trim().length === 0) {
        res.status(400).json({
          message: 'There are no notifications associated with that id.',
        })
      } else {
        res.status(200).json(notification)
      }
    })
    .catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {
  console.log('\n REQ BODY', req.body)
  if (Array.isArray(req.body)) {
    db('notifications')
      .insert(req.body)
      .returning('*')
      .then(notification => res.status(201).json(notification))
      .catch(err => res.status(500).json(err))
  } else {
    const { notificationTime, smsDelivered, plantId, userId } = req.body
    if (!plantId || !userId) {
      res.status(400).json({
        message: 'Please give the notification a plantId and userId.',
      })
    } else {
      db('notifications')
        .insert({ notificationTime, smsDelivered, plantId, userId })
        .returning('*')
        .then(notification => res.status(201).json(notification))
        .catch(err => res.status(500).json(err))
    }
  }
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { notificationTime, smsDelivered, plantId, userId } = req.body

  db('notifications')
    .where({ id: id })
    .update({ notificationTime, smsDelivered, plantId, userId })
    .returning('*')
    .then(notification => {
      if (notification) {
        res.status(200).json(notification)
      } else if (!notification) {
        res
          .status(404)
          .json({ message: "There isn't anything to update with that id." })
      }
    })
    .catch(() => res.status(500).json({ message: 'server error' }))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  db('notifications')
    .where({ id: id })
    .del()
    .then(notification => {
      if (!notification) {
        res.status(400).json({
          message:
            'There are no notifications to delete corresponding with that id.',
        })
      } else {
        res
          .status(200)
          .json({ message: 'The notification was successfully deleted.' })
      }
    })
    .catch(() => res.status(500).json({ message: 'server error' }))
})

module.exports = router

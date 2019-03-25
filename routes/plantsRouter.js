const express = require('express')
const router = express.Router()

const db = require('../data/db')

router.get('/', async (req, res) => {
  let plants = await db('plants')
  res.status(200).json(plants)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  db('plants')
    .where({ id })
    .then(plant => {
      if (plant.length === 0) {
        res
          .status(400)
          .json({ message: 'There are no plants associated with that id.' })
      } else {
        res.status(200).json(plant)
      }
    })
    .catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {
  const { name, location, description, plantURL, userId } = req.body
  if (!name || name.trim().length === 0) {
    res.status(400).json({ message: 'Please give the plant a name.' })
  } else {
    db('plants')
      .insert({ name, location, description, plantURL, userId })
      .returning('*')
      .then(plant => res.status(201).json(plant))
      .catch(err => res.status(500).json(err))
  }
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { name, location, description, plantURL, userId } = req.body

  if (!name || name.length === 0) {
    res.status(400).json({ message: 'Please give the plant a name.' })
  } else {
    db('plants')
      .where({ id: id })
      .update({ name, location, description, plantURL, userId })
      .returning('*')
      .then(plant => {
        if (plant) {
          res.status(200).json(plant)
        } else if (!plant) {
          res.status(404).json({
            message: "There isn't anything to update with that id.",
          })
        }
      })
      .catch(() => res.status(500).json({ message: 'server error' }))
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  db('plants')
    .where({ id: id })
    .del()
    .then(plant => {
      if (!plant) {
        res.status(400).json({
          message: 'There are no plants to delete corresponding with that id.',
        })
      } else {
        res.status(200).json({ message: 'The plant was successfully deleted.' })
      }
    })
    .catch(() => res.status(500).json({ message: 'server error' }))
})

router.get('/:id/notifications', (req, res) => {
  const { id } = req.params
  db('notifications')
    .where({ plantId: id })
    .then(notification => {
      if (!notification) {
        res
          .status(400)
          .json({ message: 'There are no notifications with this user' })
      } else {
        res.status(200).json(notification)
      }
    })
    .catch(err => res.status(err))
})

module.exports = router

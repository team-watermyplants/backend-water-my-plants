const uuid = require('uuid/v4')
const db = require('../data/db')
const router = require('express').Router()

const validateUser = require('../middleware/validateUser')
const methodMaker = require('../utils/crudMethodMaker')

const handler = methodMaker(db, 'plant')

router.get('/', validateUser, handler.find)
router.get('/:id', validateUser, handler.findById)
router.get('/:id/watering', validateUser, findPlantWatering)
router.post('/', validateUser, createPlant)
router.post('/:id/watering', validateUser, createPlantWatering)
router.put('/:id', validateUser, handler.update)
router.delete('/:id', validateUser, handler.remove)

//* Method Handlers
function findPlantWatering (req, res, next) {
  const plantId = req.params.id
  db('watering')
    .where({ plantId })
    .then(waterings => res.status(201).json(waterings))
    .catch(next)
}

function createPlant (req, res, next) {
  const { id } = req.decodedToken
  const { name, location, description } = req.body
  const plant = {
    id: uuid(),
    name,
    location,
    description
  }
  req.body.userId = id
  db('plant')
    .insert(plant)
    .returning('*')
    .then(inserted => res.status(201).json(inserted))
    .catch(next)
}

function createPlantWatering (req, res, next) {
  const plantId = req.params.id
  const watering = {
    id: uuid(),
    wateringTime: req.body.wateringTime,
    plantId
  }
  db('watering')
    .insert(watering)
    .returning('*')
    .then(inserted => res.status(201).json(inserted))
    .catch(next)
}

module.exports = router

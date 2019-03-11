const db = require('../data/db')
const router = require('express').Router()
const validateUser = require('../middleware/validateUser')
const methodMaker = require('../utils/crudMethodMaker')

const handler = methodMaker(db, 'user')

//* Routes
router.get('/', validateUser, findUsers)
router.post('/', validateUser, handler.create)
router.get('/:id', validateUser, handler.findById)
router.put('/:id', validateUser, handler.update)
router.delete('/:id', validateUser, handler.remove)
router.get('/:id/plants', validateUser, getUserPlants)

//* Route Handlers
function findUsers (req, res, next) {
  console.log('\nREQ.USER', req.user)
  db('user')
    .then(users => {
      res.status(200).json({ user: req.user, users })
    })
    .catch(next)
}

function getUserPlants (req, res, next) {
  const userId = req.params.id
  db('plant')
    .where({ userId })
    .then(plants => {
      res.status(200).json(plants)
    })
    .catch(next)
}

module.exports = router

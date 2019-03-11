const db = require('../data/db')
const router = require('express').Router()
const validateUser = require('../middleware/validateUser')
const methodMaker = require('../utils/crudMethodMaker')

const handler = methodMaker(db, 'watering')

router.get('/', validateUser, handler.find)
router.get('/:id', validateUser, handler.findById)
router.put('/:id', validateUser, handler.update)
router.delete('/:id', validateUser, handler.remove)
//* Router Handlers

module.exports = router

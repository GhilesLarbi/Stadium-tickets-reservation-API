const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const isAdmin = require('../../middlewares/isAdmin')
const isUser = require('../../middlewares/isUser')
const ctrl = require('../controllers/seat.controller')


// public
router.get('/count', ctrl.getSeatCount)
router.get('/count/available/game/:id', ctrl.getSeatCountAvailableByGame)
router.get('/count/available/bleacher/:type/game/:id', ctrl.getSeatCountAvailableByBleacherGame)

// private
router.post('/generate', authenticate, isAdmin, ctrl.generateSeats)
router.delete('/bleacher/:type', authenticate, isAdmin, ctrl.deleteSeats)


module.exports = router
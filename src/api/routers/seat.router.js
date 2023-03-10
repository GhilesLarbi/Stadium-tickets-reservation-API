const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const ctrl = require('../controllers/seat.controller')


// public
router.get('/count', ctrl.getSeatCount)
router.get('/count/available/game/:id', ctrl.getSeatCountAvailableByGame)
router.get('/count/available/bleacher/:type/game/:id', ctrl.getSeatCountAvailableByBleacherGame)

// private
router.post('/generate', authenticate, role('admin'), ctrl.generateSeats)
router.delete('/bleacher/:type', authenticate, role('admin'), ctrl.deleteSeats)


module.exports = router
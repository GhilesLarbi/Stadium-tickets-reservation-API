const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const ctrl = require('../controllers/seat.controller')


// public
router.get('/', ctrl.getSeats)

// private
router.post('/generate', authenticate, role('admin'), ctrl.generateSeats)
router.delete('/bleacher/:type', authenticate, role('admin'), ctrl.deleteSeats)


module.exports = router
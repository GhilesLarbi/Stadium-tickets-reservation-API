const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const queryHandler = require('../../middlewares/queryHandler')
const ctrl = require('../controllers/bleacher.controller')


// public
router.get('/', queryHandler('bleacher'), ctrl.getBleachers)
router.get('/:type', queryHandler('bleacher'), ctrl.getBleacher)

// private
router.post('/', authenticate, role('admin'), ctrl.createBleacher)
router.put('/:type', authenticate, role('admin'), ctrl.updateBleacher)
router.delete('/:type', authenticate, role('admin'), ctrl.deleteBleacher)

module.exports = router
const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const {paginationHandler} = require('../../middlewares/utilMiddlewares')
const ctrl = require('../controllers/bleacher.controller')


// public
router.get('/', paginationHandler, ctrl.getBleachers)
router.get('/:type', ctrl.getBleacher)

// private
router.post('/', authenticate, role('admin'), ctrl.createBleacher)
router.put('/:type', authenticate, role('admin'), ctrl.updateBleacher)
router.delete('/:type', authenticate, role('admin'), ctrl.deleteBleacher)

module.exports = router
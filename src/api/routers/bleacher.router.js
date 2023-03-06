const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const isAdmin = require('../../middlewares/isAdmin')
const isUser = require('../../middlewares/isUser')
const ctrl = require('../controllers/bleacher.controller')


// public
router.get('/', ctrl.getBleachers)
router.get('/:type', ctrl.getBleacher)

// private
router.post('/', authenticate, isAdmin, ctrl.createBleacher)
router.put('/:type', authenticate, isAdmin, ctrl.updateBleacher)
router.delete('/:type', authenticate, isAdmin, ctrl.deleteBleacher)

module.exports = router
const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const ctrl = require('../controllers/user.controller')


// public
router.post('/login', ctrl.loginUser)
router.post('/', ctrl.createUser)

// user && admin
router.get('/', authenticate, ctrl.getUser)

// user only
router.put('/', authenticate, role('user'), ctrl.updateUser)
router.delete('/', authenticate, role('user'), ctrl.deleteUser)

// admin only
router.delete('/:id', authenticate, role('admin'), ctrl.deleteUserById)

module.exports = router
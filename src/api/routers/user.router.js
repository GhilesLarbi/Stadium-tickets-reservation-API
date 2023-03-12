const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const {paginationHandler} = require('../../middlewares/utilMiddlewares')
const ctrl = require('../controllers/user.controller')


// public
router.post('/login', ctrl.loginUser)
router.post('/', ctrl.createUser)
router.get('/receive/confirmation/email/:token', ctrl.receiveConfirmationEmail)

// user && admin
router.get('/', authenticate, paginationHandler, ctrl.getUser)

// user only
router.put('/', authenticate, role('user'), ctrl.updateUser)
router.delete('/', authenticate, role('user'), ctrl.deleteUser)
router.get('/send/confirmation/email', authenticate, role('user'), ctrl.sendConfirmationEmail)

// admin only
router.delete('/:id', authenticate, role('admin'), ctrl.deleteUserById)

module.exports = router
const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const queryHandler = require('../../middlewares/queryHandler')
const ctrl = require('../controllers/user.controller')


router.post('/login', ctrl.loginUser)

router.post('/', ctrl.createUser)

router.get('/receive/confirmation/email/:token', ctrl.receiveConfirmationEmail)

router.get('/', authenticate, queryHandler('user'), ctrl.getUsers)

router.get('/:id', authenticate, queryHandler('user') ,ctrl.getUser)

router.put('/', authenticate, role('user'), ctrl.updateUser)

router.delete('/', authenticate, role('user'), ctrl.deleteUser)

router.get('/send/confirmation/email', authenticate, role('user'), ctrl.sendConfirmationEmail)

router.delete('/:id', authenticate, ctrl.deleteUserById)

module.exports = router
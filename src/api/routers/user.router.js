const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const isAdmin = require('../../middlewares/isAdmin')
const isUser = require('../../middlewares/isUser')
const ctrl = require('../controllers/user.controller')


// public
router.post('/login', ctrl.loginUser)
router.post('/', ctrl.createUser)

// user && admin
router.get('/', authenticate, ctrl.getUser)

// user only
router.put('/', authenticate, isUser, ctrl.updateUser)
router.delete('/', authenticate, isUser, ctrl.deleteUser)

// admin only
router.delete('/:id', authenticate, isAdmin, ctrl.deleteUserById)

module.exports = router
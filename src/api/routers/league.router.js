const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const isAdmin = require('../../middlewares/isAdmin')
const isUser = require('../../middlewares/isUser')
const ctrl = require('../controllers/league.controller')


// public
router.get('/', ctrl.getLeagues)
router.get('/:id', ctrl.getLeague)

// private
router.delete('/:id', authenticate, isAdmin, ctrl.deleteLeague)
router.post('/', authenticate, isAdmin, ctrl.createLeague)
router.put('/:id', authenticate, isAdmin, ctrl.updateLeague)

module.exports = router
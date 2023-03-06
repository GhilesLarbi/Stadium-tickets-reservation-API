const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const isAdmin = require('../../middlewares/isAdmin')
const isUser = require('../../middlewares/isUser')
const ctrl = require('../controllers/team.controller')


// public
router.get('/', ctrl.getTeams)
router.get('/:id', ctrl.getTeam)

// private
router.post('/', authenticate, isAdmin, ctrl.createTeam)
router.put('/:id', authenticate, isAdmin, ctrl.updateTeam)
router.delete('/:id', authenticate, isAdmin, ctrl.deleteTeam)

module.exports = router
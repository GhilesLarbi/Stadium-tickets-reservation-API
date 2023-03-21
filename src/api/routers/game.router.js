const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const ctrl = require('../controllers/game.controller')
const queryHandler = require('../../middlewares/queryHandler')

// public
router.get('/', queryHandler('game'), ctrl.getGames)

// private
router.delete('/:id', authenticate, role('admin'), ctrl.deleteGame)
router.post('/', authenticate, role('admin'), ctrl.createGame)
router.put('/:id', authenticate, role('admin'), ctrl.updateGame)




module.exports = router
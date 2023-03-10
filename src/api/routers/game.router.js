const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const ctrl = require('../controllers/game.controller')

// public
router.get('/', ctrl.getGames)
router.get('/:id', ctrl.getGame)

// private
router.delete('/:id', authenticate, role('admin'), ctrl.deleteGame)
router.post('/', authenticate, role('admin'), ctrl.createGame)
router.put('/:id', authenticate, role('admin'), ctrl.updateGame)




module.exports = router
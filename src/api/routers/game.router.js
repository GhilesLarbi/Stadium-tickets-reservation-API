const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const isAdmin = require('../../middlewares/isAdmin')
const isUser = require('../../middlewares/isUser')
const ctrl = require('../controllers/game.controller')


// public
router.get('/', ctrl.getGames)
router.get('/:id', ctrl.getGame)

// private
router.delete('/:id', authenticate, isAdmin, ctrl.deleteGame)
router.post('/', authenticate, isAdmin, ctrl.createGame)
router.put('/:id', authenticate, isAdmin, ctrl.updateGame)

module.exports = router
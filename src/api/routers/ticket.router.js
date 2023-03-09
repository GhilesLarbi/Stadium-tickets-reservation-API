const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const isAdmin = require('../../middlewares/isAdmin')
const isUser = require('../../middlewares/isUser')
const ctrl = require('../controllers/ticket.controller')


// user only
router.get('/', authenticate, isUser, ctrl.getTickets)
router.post('/', authenticate, isUser, ctrl.createTicket)
router.get('/:id/qrcode', authenticate, isUser, ctrl.generateQrCode)
router.delete('/:id', authenticate, isUser, ctrl.deleteTicket)

module.exports = router
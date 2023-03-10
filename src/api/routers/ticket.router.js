const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const ctrl = require('../controllers/ticket.controller')


// user only
router.get('/', authenticate, role('user'), ctrl.getTickets)
router.post('/', authenticate, role('user'), ctrl.createTicket)
router.get('/:id/qrcode', authenticate, role('user'), ctrl.generateQrCode)
router.delete('/:id', authenticate, role('user'), ctrl.deleteTicket)

module.exports = router
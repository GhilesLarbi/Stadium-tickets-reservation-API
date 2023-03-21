const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const queryHandler = require('../../middlewares/queryHandler')
const ctrl = require('../controllers/ticket.controller')


// valid user only
router.get('/', authenticate, role('admin-valid-user'), queryHandler('ticket'), ctrl.getTickets)
router.post('/', authenticate, role('valid-user'), ctrl.createTicket)
router.get('/:id/generate-pdf', authenticate, role('valid-user'), ctrl.generatePDF)
router.delete('/:id', authenticate, role('admin-valid-user'), ctrl.deleteTicket)
module.exports = router
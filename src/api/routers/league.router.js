const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const ctrl = require('../controllers/league.controller')
const fileUpload = require('express-fileupload')

// public
router.get('/', ctrl.getLeagues)
router.get('/:id', ctrl.getLeague)

// private
router.delete('/:id', authenticate, role('admin'), ctrl.deleteLeague)
router.post('/', authenticate, role('admin'), ctrl.createLeague)
router.put('/:id', authenticate, role('admin'), ctrl.updateLeague)

// league logo upload
router.post('/:id/upload/logo', authenticate, role('admin'), fileUpload({
	createParentPath : true,
	limits: {
		fileSize: 1000000, // Around 1MB
	},
	abortOnLimit: true,
}), ctrl.uploadLogo)

module.exports = router
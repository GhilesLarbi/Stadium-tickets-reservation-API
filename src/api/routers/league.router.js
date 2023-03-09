const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const isAdmin = require('../../middlewares/isAdmin')
const isUser = require('../../middlewares/isUser')
const ctrl = require('../controllers/league.controller')
const fileUpload = require('express-fileupload')

// public
router.get('/', ctrl.getLeagues)
router.get('/:id', ctrl.getLeague)

// private
router.delete('/:id', authenticate, isAdmin, ctrl.deleteLeague)
router.post('/', authenticate, isAdmin, ctrl.createLeague)
router.put('/:id', authenticate, isAdmin, ctrl.updateLeague)

// league logo upload
router.post('/:id/upload/logo', authenticate, isAdmin, fileUpload({
	createParentPath : true,
	limits: {
		fileSize: 1000000, // Around 10MB
	},
	abortOnLimit: true,
}), ctrl.uploadLogo)

module.exports = router
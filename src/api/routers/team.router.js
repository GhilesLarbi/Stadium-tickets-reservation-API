const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const isAdmin = require('../../middlewares/isAdmin')
const isUser = require('../../middlewares/isUser')
const ctrl = require('../controllers/team.controller')
const fileUpload = require('express-fileupload')


// public
router.get('/', ctrl.getTeams)
router.get('/:id', ctrl.getTeam)

// private
router.post('/', authenticate, isAdmin, ctrl.createTeam)
router.put('/:id', authenticate, isAdmin, ctrl.updateTeam)
router.delete('/:id', authenticate, isAdmin, ctrl.deleteTeam)
// league logo upload
router.post('/:id/upload/logo', authenticate, isAdmin, fileUpload({
	createParentPath : true,
	limits: {
		fileSize: 1000000, // Around 1MB
	},
	abortOnLimit: true,
}), ctrl.uploadLogo)



module.exports = router
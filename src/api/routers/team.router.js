const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const ctrl = require('../controllers/team.controller')
const fileUpload = require('express-fileupload')


// public
router.get('/', ctrl.getTeams)
router.get('/:id', ctrl.getTeam)

// private
router.post('/', authenticate, role('admin'), ctrl.createTeam)
router.put('/:id', authenticate, role('admin'), ctrl.updateTeam)
router.delete('/:id', authenticate, role('admin'), ctrl.deleteTeam)
// league logo upload
router.post('/:id/upload/logo', authenticate, role('admin'), fileUpload({
	createParentPath : true,
	limits: {
		fileSize: 1000000, // Around 1MB
	},
	abortOnLimit: true,
}), ctrl.uploadLogo)



module.exports = router
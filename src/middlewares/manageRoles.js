const tempFileHandler = require('express-fileupload/lib/tempFileHandler')
const AppErr = require('../utils/AppErr')
const { append } = require('express/lib/response')

const manageRoles = (role) => {
	role = role.toLowerCase()
	return function (req, res, next) {
		if (role == 'admin' && req.isAdmin)
			return next()
			
		if (role == 'user' && !req.isAdmin)
			return next()
		
		if (role == 'valid-user' && !req.isAdmin) {
			if (!req.isEmailConfirmed) throw new AppErr(401, "Please confirm your email", "isEmailConfirmed")
			if (!req.phone) throw new AppErr(401, "Please add a phone number", "phone")
			if (!req.nationalNumber) throw new AppErr(401, "Please confirm your identity", "nationalNumber")
			return next()
		}

		if (role == 'admin-valid-user') {
			if (req.isAdmin) return next()
			if (!req.isEmailConfirmed) throw new AppErr(401, 'Please confirm your email', 'isEmailConfirmed')
			if (!req.phone) throw new AppErr(401, "Please add a phone number", "phone")
			if (!req.nationalNumber) throw new AppErr(401, "Please confirm your identity", "nationalNumber")
			return next()

		}
		throw new AppErr(401, 'You are not authorized', 'token')
	}
}

module.exports = manageRoles
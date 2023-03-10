const manageRoles = (role) => {
	return function (req, res, next) {
		if (role.toLowerCase() == 'admin' && req.isAdmin)
			return next()
			
		else if (role.toLowerCase() == 'user' && !req.isAdmin)
			return next()
		
		throw new Error('You are not authorized')
	}
}

module.exports = manageRoles
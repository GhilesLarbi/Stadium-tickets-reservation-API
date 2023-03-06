const isUser = (req, res, next) => {
	if (req.isAdmin) throw new Error('You are not authorized')
	return next()
}

module.exports = isUser
const isUser = (req, res, next) => {
	if (req.isAdmin) throw new Error('Stop sniffing you fucking dummass')
	return next()
}

module.exports = isUser
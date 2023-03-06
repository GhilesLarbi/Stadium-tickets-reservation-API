function notFoundErrorHandler(req, res, next) {
	const err = new Error(`cannot find ${req.originalUrl} on the server`)
	err.statusCode = 404
	next(err)
}

module.exports = notFoundErrorHandler

const responseTemplate = require('../utils/responseTemplate')

function globalErrorHandler(err, req, res, next) {
	const statusCode = err.statusCode || 500
	
	res.status(statusCode).json(responseTemplate(
		false,
		statusCode,
		err.message,
		{ stack : err.stack }
	))
}

module.exports = globalErrorHandler
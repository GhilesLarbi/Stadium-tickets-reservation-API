const AppErr = require ('../utils/AppErr')

function notFoundErrorHandler(req, res, next) {
	const err = new AppErr(404, 'page not found', 'path')
	next(err)
}

module.exports = notFoundErrorHandler
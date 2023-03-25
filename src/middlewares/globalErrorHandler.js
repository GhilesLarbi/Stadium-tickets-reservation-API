const sequelize = require ('sequelize')
const ValidationError = sequelize.ValidationError

function globalErrorHandler(err, req, res, next) {
	let message
	let field
	let code
	
	// console.log(err)
	
	// FIXME
	// check if the error is comming from sequelize
	if (err instanceof ValidationError) {
		message = err.errors[0].message
		field = err.errors[0].path
		code = 406
	} 
	else {
		message = err.message
		field = err.field
		code = err.statusCode || 500
	}
	
	res.status(code).json({
		success : false,
		code,
		message,
		field,
		// development only
		// data : { stack : err.stack },
	})
}

module.exports = globalErrorHandler
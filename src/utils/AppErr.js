class AppErr extends Error {
	constructor (statusCode, message, field) {
		super(message)
		this.success = false
		this.statusCode = statusCode || 500
		this.field = field || null
	}
}

module.exports = AppErr
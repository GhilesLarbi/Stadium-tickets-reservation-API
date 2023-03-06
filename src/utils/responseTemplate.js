function responseTemplate(success, code, message, data) {
	return {
		success,
		code,
		message,
		data : data || {},
	}
}

module.exports = responseTemplate
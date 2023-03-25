function AppRes(code, message, data) {
	return {
		success: (code >= 200 && code < 300) ? true: false,
		code,
		message,
		results: (data instanceof Array)? data.length: 1,
		data: data || {},
	}
}

module.exports = AppRes
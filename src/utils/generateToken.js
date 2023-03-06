const jwt = require('jsonwebtoken')

function generateJwt(data) {
	return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET)
}

module.exports = generateJwt
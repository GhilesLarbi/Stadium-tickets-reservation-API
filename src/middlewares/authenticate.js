const sequelize = require('../api/models')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncErrorHandler')
const AppErr = require('../utils/AppErr')
const userModel = sequelize.models.user

const authenticate = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers['authorization']
	if (!authHeader) throw new AppErr(401, 'You are not loged in', 'token')
	
	const token = authHeader && authHeader.split(' ')[1]
	if (!token) throw new AppErr(400, 'Bearer "token" format is expected', 'authorization')
	
	await jwt.verify(token, process.env.TOKEN_ENCRYPTION_KEY, async (err, data) => {
		if (err) throw new AppErr(401, 'Invalid token', 'token')
		
		// save data in the request object
		req.isAdmin = data.isAdmin
		req.id = data.id
		
		// if it's the admin just call next
		if (data.isAdmin) return next()
		
		// check if the user id exist
		const user = await userModel.findOne({
			where : {id : data.id},
			raw : true,
		})
		
		// if the user doesn't exist throw an error
		if (!user) throw new AppErr(404, 'The user you loged in with is no longer valid', 'token')
		
		req.isEmailConfirmed = user.isEmailConfirmed
		
		return next()
	})
})

module.exports = authenticate
const sequelize = require('../api/models')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncErrorHandler')
const userModel = sequelize.models.user

const authenticate = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers['authorization']
	if (!authHeader) throw new Error('You are not loged in')
	
	const token = authHeader && authHeader.split(' ')[1]
	if (!token) throw new Error('Bad token header')
	
	await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
		if (err) throw new Error('Invalid token')
		
		// save data in the request object
		req.isAdmin = data.isAdmin
		req.id = data.id
		
		
		// if it's the admin just call next
		if (data.isAdmin) return next()
		
		// check if the user id exist
		const user = await userModel.findOne({where : {id : data.id}})
		if (user) return next()
		
		// if the user doesn't exist throw an error
		else throw new Error('The user you loged in with is no longer valid')
		
	})
})

module.exports = authenticate
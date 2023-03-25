const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')

const jwt = require('jsonwebtoken')


const loginAdmin = asyncHandler(async (req, res) => {
	const {user, password} = req.body
	
	// if no email or password then throw error
	if (!user) throw new AppErr(400, 'user is expected', 'user')
	if (!password) throw new AppErr(400, 'password is expected', 'password')
	
	// check if email and password are correct
	if (user != "admin")
		throw new AppErr(401, 'user is incorrect', 'user')
	if ( password != "admin")
		throw new AppErr(401, 'password is incorrect', 'password')
	
	// generate token
	const token = jwt.sign(
		{id : null, isAdmin : true},
		process.env.TOKEN_ENCRYPTION_KEY
	)
	
	res.send(AppRes(200, 'you loged in', {token}))
})

module.exports =  {
	loginAdmin,
}
const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')

const jwt = require('jsonwebtoken')


const loginAdmin = asyncHandler(async (req, res) => {
	const {email, password} = req.body
	
	// if no email or password then throw error
	if (!email) throw new AppErr(400, 'email is expected', 'email')
	if (!password) throw new AppErr(400, 'password is expected', 'password')
	
	// check if email and password are correct
	if (email != process.env.EMAIL)
		throw new AppErr(401, 'email is incorrect', 'email')
	if ( password != process.env.EMAIL_PASSWORD)
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

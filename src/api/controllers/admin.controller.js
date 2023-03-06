const asyncHandler = require('../../utils/asyncErrorHandler')
const generateToken = require('../../utils/generateToken')

const responseTemplate = require('../../utils/responseTemplate')

//@desc check if user is in datanase and send the token
//@route POST /api/user/login
//@access public
const loginAdmin = asyncHandler(async (req, res) => {
	const {user, password} = req.body
	
	// if no email or password then throw error
	if (!(user && password)) throw new Error('bad body data')
	
	// check if the email and password are correct
	if (user != "admin" || password != "admin")
		throw new Error('invalid credentials')
	
	// generate token based on the user id
	const token = generateToken({id : null, isAdmin : true})
	
	res.send(responseTemplate(true, 200, 'you loged in', {token}))
})

module.exports =  {
	loginAdmin,
}
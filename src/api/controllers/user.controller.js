const sequelize = require('../models')
const userModel = sequelize.models.user

const bcrypt = require('bcrypt')
const asyncHandler = require('../../utils/asyncErrorHandler')
const generateToken = require('../../utils/generateToken')

const responseTemplate = require('../../utils/responseTemplate')

//@desc check if user is in the database && generate && send the token
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
	const {email, password} = req.body
	
	// if no email or password then throw an error
	if (!(email && password)) throw new Error('bad body data')
	
	// check if email and password are in the database
	const user = await userModel.findOne({
		where : {
			email : email,
		},
	})
	
	// if no user found throw an error
	if (!user) throw new Error('email is incorrect')
	
	// compare passwords
	if (!bcrypt.compareSync(password, user.password))
		throw new Error('password is incorrect')
	
	// generate token based on user id
	const token = generateToken({id : user.id, isAdmin : false})
	
	res.send(responseTemplate(true, 200, '', {token}))
})


//@desc send user info
//@desc send all users info if admin by limit && offset pagination queries
//@route GET /api/user
//@access user
const getUser = asyncHandler(async (req, res) => {
	let result
	if (req.isAdmin) {
		// if admin
		// check pagination queries
		let {limit, offset} = req.query
		
		limit = parseInt(limit) || 20
		limit = (limit > 20 || limit < 1) ? 20 : limit
		
		offset = parseInt(offset) || 0
		
		// find users
		result = await userModel.findAll({
			attributes : {exclude : ['password'],},
			limit : limit,
			offset : offset,
		})
		
	} else {
		// if user
		// search by id
		result = await userModel.findOne({
			where : {id : req.id},
			attributes : {exclude : ['password']},
		})
	}
	
	if (!result) throw new Error('Didn\'t found what you are looking for')
	res.send(responseTemplate(true, 200, 'data fetched', result))
})
	

//@desc create new user
//@route POST /api/user
//@access public
const createUser = asyncHandler(async (req, res) => {
	const user = {...req.body}
	
	// delete unnecessary data
	// if someone try to inject them
	delete user.id
	delete user.isEmailConfirmed
	delete user.username
	
	// generate username
	user.username = user.firstname + Math.floor(Math.random()*1000)
	while (await userModel.findOne({where : {username : user.username}})) {
		// add a random digit if username exist
		user.username += user.firstname + Math.floor(Math.random()*10)
	}
	
	// FIXME
	// confirm the email using mailer package
	
	// create the user
	let result = await userModel.create(user)
	
	result = result.toJSON()
	delete result.password
	
	res.send(responseTemplate(true, 200, 'user created successfully', result))
})


//@desc update user
//@route PUT /api/user
//@access user
const updateUser = asyncHandler(async (req, res) => {
	const user = {...req.body}
	
	// delete unnecessary data
	// if someone try to inject them
	delete user.id
	delete user.isEmailConfirmed
	
	if (user.password) 
		user.password = bcrypt.hashSync(user.password, 10)
	
	// update the user
	const result = await userModel.update(user, {
		where : {id : req.id}
	})
	
	
	res.send(responseTemplate(true, 200, 'user updated successfully', {infected : result[0]}))
})


//@desc delete user
//@route DELETE /api/user
//@access user
const deleteUser = asyncHandler(async (req, res) => {
	
	// delete the user
	const result = await userModel.destroy({
		where : {id : req.id}
	})
	
	res.send(responseTemplate(true, 200, 'user deleted successfully', {infected : result}))
})


//@desc delete user by id
//@route DELETE /api/user/:id
//@access private
const deleteUserById = asyncHandler(async (req, res) => {
	
	// delete the user
	const result = await userModel.destroy({
		where : {id : req.params.id}
	})
	
	res.send(responseTemplate(true, 200, 'user deleted successfully', {infected : result}))
})


module.exports =  {
	loginUser,
	getUser,
	createUser,
	updateUser,
	deleteUser,
	deleteUserById,
}
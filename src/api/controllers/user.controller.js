const sequelize = require('../models')
const { Op } = require('sequelize');
const db = sequelize.models

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('../../utils/asyncErrorHandler')

const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')


//@desc check if user is in the database && generate && send the token
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
	const {email, password} = req.body
	
	// if no email or password then throw an error
	if (!email) throw new AppErr(400, 'email is expected')
	if (!password) throw new AppErr(400, 'password is expected')
	
	// check if email and password are in the database
	const user = await db.user.findOne({
		where : {
			email : email,
		},
		raw : true,
	})
	
	// if no user found throw an error
	if (!user) throw new AppErr(401, 'email is incorrect', 'email')
	
	// compare passwords
	if (!bcrypt.compareSync(password, user.password))
		throw new AppErr(401, 'password is incorrect', 'password')
	
	// generate token based on user id
	const token = jwt.sign(
		{id : user.id, isAdmin : false},
		process.env.TOKEN_ENCRYPTION_KEY,
	)
	
	res.send(AppRes(200, 'user loged in', {token}))
})


//@desc send user info
//@desc send all users info if admin by limit && offset pagination queries
//@route GET /api/user
//@access user
const getUser = asyncHandler(async (req, res) => {
	let result
	let option = {
		attributes : {exclude : ['password']},
		where : {},
		limit : req.limit,
		offset : req.offset,
		raw : true
	}
	
	if (req.isAdmin) {
		// if admin
		// is email confirmed
		if (req.query.isEmailConfirmed in ['0', '1'])
			option.where.isEmailConfirmed = (req.query.isEmailConfirmed == '1') ? true : false
		
		// email
		if (req.query.email)
			option.where.email = {[Op.substring]: req.query.email}
		
		
		// user id 
		if (parseInt(req.query.id))
			option.where.id = req.query.id
		
		
		// if count query is present
		if (req.count) {
			option.attributes = [[sequelize.fn('COUNT', sequelize.col('id')), 'count']]
			result = await db.user.findOne(option)
		} else {
			// find users
			result = await db.user.findAll(option)
		}
		
	} else {
		// if user
		// search by id
		option.where = {id : req.id}
		result = await db.user.findOne(option)
		
		if (!result) 
			return res.status(409).send(AppRes(409, 'Somthing wrong with your account', 'userId'))
	}
	
	res.send(AppRes(200, 'data fetched', result))
})
	

//@desc create new user
//@route POST /api/user
//@access public
const createUser = asyncHandler(async (req, res) => {
	const user = req.body
	
	// delete unnecessary data
	// if someone try to inject them
	delete user.id
	delete user.isEmailConfirmed
	delete user.username
	
	// create the user
	let result = await db.user.create(user)
	
	result = result.toJSON()
	delete result.password
	
	res.status(201).send(AppRes(201, 'user created successfully', result))
})


//@desc update user
//@route PUT /api/user
//@access user
const updateUser = asyncHandler(async (req, res) => {
	const user = req.body
	
	// delete unnecessary data
	// if someone try to inject them
	delete user.id
	delete user.isEmailConfirmed
	
	if (user.password) 
		user.password = bcrypt.hashSync(user.password, 10)
	
	// find user
	let result = await db.user.findOne({
		where : {id : req.id}
	})
	
	// update user
	result.update(user)
	
	// send the new user
	result = result.toJSON()
	delete result.password
	
	res.send(AppRes(200, 'user updated successfully', result))
})


//@desc delete user
//@route DELETE /api/user
//@access user
const deleteUser = asyncHandler(async (req, res) => {
	
	// find the user
	let result = await db.user.findOne({
		where : {id : req.id}
	})
	
	result.destroy()
	
	// send the deleted user
	result = result.toJSON()
	delete result.password
	
	res.send(AppRes(200, 'user deleted successfully', result))
})


//@desc delete user by id
//@route DELETE /api/user/:id
//@access private
const deleteUserById = asyncHandler(async (req, res) => {
	// find the user
	let result = await db.user.findOne({
		where : {id : req.params.id}
	})
	
	if (!result) throw new AppErr(404, 'Didn\'t find any user with id of '+req.params.id, 'userId')
	
	result.destroy()
	
	// send the deleted user
	result = result.toJSON()
	delete result.password
	
	res.send(AppRes(200, 'user deleted successfully', {infected : result}))
})

//@desc send confirmation email
//@route GET /api/user/send/confirmation/email
//@access user
const sendConfirmationEmail = asyncHandler(async (req, res) => {
	// check if email is confirmed
	const user = await db.user.findOne({
		where : {id : req.id},
		raw : true,
	})
	
	if (user.isEmailConfirmed) throw new AppErr(405, 'Email is already confirmed', 'email')
	
	// generate token
	const token = jwt.sign(
		{id : user.id},
		process.env.TOKEN_ENCRYPTION_KEY,
		{ expiresIn : '1d'}
	)
	
	// FIXME
	// set a dynamic url instead
	const url = 'http://' + req.hostname + ':3000/api/user/receive/confirmation/email/' + token
	
	// FIXME
	// send the email here
	
	res.send(AppRes(200, 'email has been sent', {url, email : user.email}))
})

//@desc receive confirmation email
//@route GET /api/user/receive/confirmation/email/:token
//@access public
const receiveConfirmationEmail = asyncHandler(async (req, res) => {
	await jwt.verify(req.params.token, process.env.TOKEN_ENCRYPTION_KEY, async (err, data) => {
		if (err) throw new AppErr(401, 'Invalid token', 'token')
		
		const user = await db.user.findByPk(data.id)
		user.isEmailConfirmed = true
		user.save()
		
		res.send(AppRes(202, 'email confirmed'))
	})
})

module.exports =  {
	loginUser,
	getUser,
	createUser,
	updateUser,
	deleteUser,
	deleteUserById,
	sendConfirmationEmail,
	receiveConfirmationEmail,
}
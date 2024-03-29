const sequelize = require('../models')
const db = sequelize.models

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('../../utils/asyncErrorHandler')

const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')
const sendEmail = require('../../utils/sendEmail')


//@route GET /user/login 
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	// if no email or password then throw an error
	if (!email) throw new AppErr(400, 'email is expected')
	if (!password) throw new AppErr(400, 'password is expected')

	// check if email and password are in the database
	const user = await db.user.scope({ method: ['login', email] }).findOne()

	// if no user found throw an error
	if (!user) throw new AppErr(401, 'email is incorrect', 'email')


	// compare passwords
	if (!bcrypt.compareSync(password, user.password))
		throw new AppErr(401, 'password is incorrect', 'password')

	// generate token based on user id
	const token = jwt.sign(
		{ id: user.id, isAdmin: false },
		process.env.TOKEN_ENCRYPTION_KEY,
	)

	res.send(AppRes(200, 'user loged in', { token }))
})

//@route GET /user 
//@middlewares authenticate => queryHandler
const getUsers = asyncHandler(async (req, res) => {
	let result
	let option = req.option

	if (req.isAdmin) {
		if (req.count) result = await db.user.findOne(option)
		else result = await db.user.findAll(option)

	} else {
		result = await db.user.findOne(option)
		if (!result)
			return res.status(409).send(AppRes(409, 'Somthing went wrong', 'userId'))
	}


	res.send(AppRes(200, 'data fetched', result))
})

//@route GET /user/:id
//@middlewares authenticate => queryHandler
const getUser = asyncHandler(async (req, res) => {
	if (!req.isAdmin && (req.id != req.params.id))
		throw new AppErr(401, "you are not authorized", "userId")


	let option = req.option
	option.where = { id: req.params.id }
	const result = await db.user.findOne(option)

	if (!result) throw new AppErr(404, `No user with id of ${req.params.id}`, "userId")


	res.send(AppRes(200, "data fetched", result))
})

//@route POST /user 
const createUser = asyncHandler(async (req, res) => {
	const user = req.body

	// delete unnecessary data
	// if someone try to inject them
	delete user.id
	delete user.isEmailConfirmed
	

	if (user.password)
		if (user.password.length < 7)
			throw new AppErr(400, "please choose a strong password that has more than 7 characters", "password")

	// create the user
	let result = await db.user.create(user)

	result = result.toJSON()
	delete result.password

	res.status(201).send(AppRes(201, 'user created successfully', result))
})

//@route PUT /user 
//@middlewares authenticate => role(user)
const updateUser = asyncHandler(async (req, res) => {
	const user = req.body

	// delete unnecessary data
	// if someone try to inject them
	delete user.id
	delete user.isEmailConfirmed

	// find user
	let result = await db.user.findOne({
		where: { id: req.id }
	})

	if (user.password)
		if (user.password.length < 7)
			throw new AppErr(400, "please choose a strong password that has more than 7 characters", "password")


	// check if the email is different 
	if (user.email && result.email.toLowerCase() != user.email.toLowerCase())
		user.isEmailConfirmed = false

	// update user 
	await result.update(user)

	res.send(AppRes(200, 'user updated successfully', result))
})

//@route DELETE /user 
//@middlewares authenticate => role(user)
const deleteUser = asyncHandler(async (req, res) => {

	// find the user
	let result = await db.user.findOne({
		where: { id: req.id }
	})

	await result.destroy()

	res.send(AppRes(200, 'user deleted successfully', result))
})

//@route DELETE /user/:id
//@middlewares authenticate
const deleteUserById = asyncHandler(async (req, res) => {
	if (!req.isAdmin && (req.id != req.params.id))
		throw new AppErr(401, "you are not authorized", "userId")

	// find the user
	let result = await db.user.findOne({
		where: { id: req.params.id },
		attributes: {
			exclude: ['password'],
		},
	})

	if (!result) throw new AppErr(404, 'Didn\'t find any user with id of ' + req.params.id, 'userId')

	await result.destroy()

	res.send(AppRes(200, 'user deleted successfully', { infected: result }))
})

//@route GET /user/send/confirmation/email 
//@middlewares authenticate => role(user)
const sendConfirmationEmail = asyncHandler(async (req, res) => {
	const returnUrl = req.query.url

	if (!returnUrl) throw new AppErr(406, "No return url provided", "url")

	// check if email is confirmed
	const user = await db.user.findOne({
		where: { id: req.id },
		raw: true,
	})

	if (user.isEmailConfirmed) throw new AppErr(405, 'Email is already confirmed', 'email')

	// generate token
	const token = jwt.sign(
		{
			id: user.id,
			returnUrl: returnUrl,
		},
		process.env.TOKEN_ENCRYPTION_KEY,
		{ expiresIn: '1d' }
	)

	// FIXME
	// set a dynamic url instead
	const url = `${req.protocol}://${req.get('host')}${process.env.API_URL}/user/receive/confirmation/email/${token}`
	// const url = 'http://' + req.hostname + '/api/user/receive/confirmation/email/' + token

	// FIXME
	// send the email here
	
	const email = await sendEmail(user, url)
	if (!email) throw new AppErr(400, 'Please provide a real email', 'email')

	res.send(AppRes(200, 'email has been sent', user))
})

//@route GET /user/receive/confirmation/email/:toke 
const receiveConfirmationEmail = asyncHandler(async (req, res) => {
	await jwt.verify(req.params.token, process.env.TOKEN_ENCRYPTION_KEY, async (err, data) => {
		if (err) throw new AppErr(401, 'Invalid token', 'token')
		const user = await db.user.findByPk(data.id)
		user.isEmailConfirmed = true
		user.save()
		res.status(308).redirect(data.returnUrl)
	})
})

module.exports = {
	loginUser,
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
	deleteUserById,
	sendConfirmationEmail,
	receiveConfirmationEmail,
}

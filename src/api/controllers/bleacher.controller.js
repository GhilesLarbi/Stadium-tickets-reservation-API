const sequelize = require('../models')
const db = sequelize.models
const { Op } = require('sequelize')

const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')

//@desc get all bleachers
//@route GET /api/bleacher
//@access public
const getBleachers = asyncHandler(async (req, res) => {
	const splitQuery = (query) => {
		const op = query.slice(0,2)
		const num = parseInt(query.slice(2))
		if (!num) return null
		
		
		if (op == 'gt') return { [Op.gte] : num}
		else if (op == 'lt') return { [Op.lte] : num }
		else if (op == 'eq') return { [Op.eq] : num }
		
		return null
	}
	
	let option = {where : {}}
	let result
	
	// split include query
	if (req.query.include) 
		req.query.include = req.query.include.split(',')
	else req.query.include = []
	
	// type query
	if (req.query.type)
		option.where.type =  {[Op.substring]: req.query.type}
	
	
	// quantity query
	if (req.query.quantity) {
		const quantity = splitQuery(req.query.quantity)
		if (quantity) option.where.quantity = splitQuery(req.query.quantity)
	}
	
	// price query
	if (req.query.price) {
		const price = splitQuery(req.query.price)
		if (price) option.where.price = splitQuery(req.query.price)
	}
	
	// if count query is present
	if (req.query.count) {
		
		option.attributes = [[sequelize.fn('COUNT', sequelize.col('type')), 'count']]
		result = await db.bleacher.findOne(option)
		
	} else {
		
		result = await db.bleacher.findAll(option)
	}
	
	res.send(AppRes(200, 'data fetched', result))
})

//@desc get single bleacher by type
//@route GET /api/bleacher/:type
//@access public
const getBleacher = asyncHandler(async (req, res) => {
	const result = await db.bleacher.findOne({
		where : {type : req.params.type},
	})
	
	// if no bleacher found send error msg
	if (!result) throw new AppErr(404, req.params.type + ' bleacher not found', 'bleacherType')
	
	res.send(AppRes(200, 'data fetched', result))
})


//@desc create bleacher
//@route POST /api/bleacher
//@access private
const createBleacher = asyncHandler(async (req, res) => {
	const bleacher = {...req.body}
	
	// FIXME
	// check the bleacher params before updating it
	
	const result = await db.bleacher.create(bleacher)
	
	res.status(201).send(AppRes(201, 'bleacher created', result))
})


//@desc update bleacher
//@route PUT /api/bleacher/:type
//@access private
const updateBleacher = asyncHandler(async (req, res) => {
	const bleacher = req.body
	
	// FIXME
	// check the bleacher params before updating it
	
	let result = await db.bleacher.findOne({
		where : {type : req.params.type},
	})
	
	if (!result) throw new AppErr(404, 'No bleacher with type of '+req.params.type, 'bleacherType')
	
	result.update(bleacher)
	
	// for some reason the type is not changing
	result.dataValues.type = bleacher.type
	result.save()
	
	res.send(AppRes(200, 'bleacher updated', result))
})


//@desc delete bleacher
//@route DELETE /api/bleacher/:type
//@access private
const deleteBleacher = asyncHandler(async (req, res) => {
	const result = await db.bleacher.findOne({
		where : {type : req.params.type},
	})
	
	if (!result) throw new AppErr(404, 'No bleacher with type of '+req.params.type, 'bleacherType')
	
	result.destroy()
	
	res.send(AppRes(200, 'bleacher deleted', {infected :result}))
})

module.exports = {
	getBleachers,
	getBleacher,
	createBleacher,
	updateBleacher,
	deleteBleacher,
}
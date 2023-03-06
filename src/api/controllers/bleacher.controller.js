const sequelize = require('../models')
const bleacherModel = sequelize.models.bleacher

const asyncHandler = require('../../utils/asyncErrorHandler')
const responseTemplate = require('../../utils/responseTemplate')

//@desc get all bleachers
//@route GET /api/bleacher
//@access public
const getBleachers = asyncHandler(async (req, res) => {
	const result = await bleacherModel.findAll()
	
	res.send(responseTemplate(true, 200, 'data fetched', result))
})

//@desc get single bleacher by type
//@route GET /api/bleacher/:type
//@access public
const getBleacher = asyncHandler(async (req, res) => {
	const result = await bleacherModel.findOne({
		where : {type : req.params.type},
	})
	
	// if no bleacher found send error msg
	if (!result) throw new Error(req.params.type + ' bleacher not found')
	
	res.send(responseTemplate(true, 200, 'data fetched', result))
})


//@desc create bleacher
//@route POST /api/bleacher
//@access private
const createBleacher = asyncHandler(async (req, res) => {
	const bleacher = {...req.body}
	
	// FIXME
	// check the bleacher params before updating it
	
	const result = await bleacherModel.create(bleacher)
	
	res.send(responseTemplate(true, 200, 'bleacher created', result))
})


//@desc update bleacher
//@route PUT /api/bleacher/:type
//@access private
const updateBleacher = asyncHandler(async (req, res) => {
	const bleacher = {...req.body}
	
	// FIXME
	// check the bleacher params before updating it
	
	const result = await bleacherModel.update(bleacher, {
		where : {type : req.params.type},
	})
	
	res.send(responseTemplate(true, 200, 'bleacher updated', {infected : result[0]}))
})


//@desc delete bleacher
//@route DELETE /api/bleacher/:type
//@access private
const deleteBleacher = asyncHandler(async (req, res) => {
	const result = await bleacherModel.destroy({
		where : {type : req.params.type},
	})
	
	res.send(responseTemplate(true, 200, 'bleacher deleted', {infected :result}))
})

module.exports = {
	getBleachers,
	getBleacher,
	createBleacher,
	updateBleacher,
	deleteBleacher,
}
const sequelize = require('../models')
const seatModel = sequelize.models.seat
const db = sequelize.models
const { Op } = require('sequelize');

const asyncHandler = require('../../utils/asyncErrorHandler')
const {takenSeats, availableSeats} = require('../../utils/modelUtils')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')

//@desc get seats count
//@route GET /api/seat
//@access public
const getSeats = asyncHandler(async (req, res) => {
	let option = {attributes : [[sequelize.fn('COUNT', sequelize.col('id')), 'count']], where : {}, raw : true}
	
	// bleacherType
	if (req.query.bleacherType)
		option.where.bleacherType = {[Op.substring]: req.query.bleacherType}
	
	// code
	if (req.query.code)
		option.where.code = {[Op.substring]: req.query.code}
	
	// available by game id
	if (req.query.availableByGameId) 
		option.where.id = {[Op.notIn]: await takenSeats(req.query.availableByGameId)}
	
	const result = await seatModel.findOne(option)
	
	res.send(AppRes(200, 'data fetched', result))
})



//@desc generate seats by bleacher type
//@route POST api/seat/generate
//@access private
const generateSeats = asyncHandler(async (req, res) => {
	const {type, letters, min, max} = req.body
	
	// validate the body request
	if (!(type && letters && min && max) || min > max || typeof letters != 'string')
		throw new AppErr(400, 'bad body data')
	if (typeof min != 'number' || typeof max != 'number' || typeof type != 'string')
		throw new AppErr(400, 'bad body data')
	
	// check if bleacher type exist
	const bleachersCount = await db.bleacher.findOne({
		attributes : [[sequelize.fn('COUNT', sequelize.col('type')), 'count']],
		where : {
			type : type,
		},
		raw : true,
	})
	
	if (bleachersCount.count == 0) throw new AppErr(404, 'No bleacher with type of '+type, 'bleacherType')
	
	
	// generate seats
	for (let i = 0; i < letters.length; i++){
		for (let j = min ; j < max ; j++) {
			await seatModel.create({
				code : letters[i] + j,
				bleacherType : type,
			})
		}
	}
	
	res.status(201).send(AppRes(201, 'seats generated successfully ', {infected : (max - min) * letters.length}))
})

//@desc delete seats by bleacher type
//@route DELETE api/seat/bleacher/:type
//@access private
const deleteSeats = asyncHandler(async (req, res) => {
	const result = await seatModel.destroy({
		where : {
			bleacherType : req.params.type,
		},
	})
	
	res.send(AppRes(200, 'seats deleted successfully ', {infected : result}))
})


module.exports = {
	getSeats,
	generateSeats,
	deleteSeats,
}
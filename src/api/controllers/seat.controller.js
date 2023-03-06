const sequelize = require('../models')
const seatModel = sequelize.models.seat

const asyncHandler = require('../../utils/asyncErrorHandler')
const responseTemplate = require('../../utils/responseTemplate')
//@desc get seats count
//@route GET /api/seat
//@access public
const getSeatCount = asyncHandler(async (req, res) => {
	const result = await seatModel.findOne({
		attributes : [
			[sequelize.fn('COUNT', sequelize.col('code')), 'count'],
		],
	})
	
	res.send(responseTemplate(true, 200, 'data fetched', result))
})


//@desc get available seats count by game
//@route GET api/seat/count/available/game/:id
//@access public
const getSeatCountAvailableByGame = asyncHandler(async (req, res) => {
	res.send(responseTemplate(false, 500, 'route not implemented yet'))
})


//@desc get available seats count by game && bleacher
//@route GET api/seat/count/available/bleacher/:type/game/:id
//@access public
const getSeatCountAvailableByBleacherGame = asyncHandler(async (req, res) => {
	res.send(responseTemplate(false, 500, 'route not implemented yet'))
})


//@desc generate seats by bleacher type
//@route POST api/seat/generate
//@access private
const generateSeats = asyncHandler(async (req, res) => {
	const {type, letters, min, max} = req.body
	
	// validate the body request
	if (!(type && letters && min && max) || min > max || typeof letters != 'string')
		throw new Error('bad body data')
	if (typeof min != 'number' || typeof max != 'number' || typeof type != 'string')
		throw new Error('bad body data')
	
	// generate seats
	for (let i = 0; i < letters.length; i++){
		for (let j = min ; j < max ; j++) {
			await seatModel.create({
				code : letters[i] + j,
				bleacherType : type,
			})
		}
	}
	
	res.send(responseTemplate(true, 200, 'seats generated successfully ', {infected : (max - min) * letters.length}))
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
	
	res.send(responseTemplate(true, 200, 'seats deleted successfully ', {infected : result}))
})


module.exports = {
	getSeatCount,
	getSeatCountAvailableByGame,
	getSeatCountAvailableByBleacherGame,
	generateSeats,
	deleteSeats,
}
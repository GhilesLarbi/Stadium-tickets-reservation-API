const sequelize = require('../models')
const gameModel = sequelize.models.game

const asyncHandler = require('../../utils/asyncErrorHandler')
const responseTemplate = require('../../utils/responseTemplate')

//@desc get leagues
//@route GET /api/league
//@access public
const getGames = asyncHandler(async (req, res) => {
	// read queries
	let includeQuery = req.query.include || ''
	includeQuery = includeQuery.split(',')
	const {isOver, isLive} = req.query
	
	let options = {where : {}, include : []}
	
	// include teams
	if (includeQuery.includes('team')) {
		options.include.push({
			model : sequelize.models.team,
			as : 'team1',
		})
		
		options.include.push({
			model : sequelize.models.team,
			as : 'team2',
		})
	}
	
	// include league
	if (includeQuery.includes('league')) options.include.push(sequelize.models.league)
	
	// filter data
	if (isOver == '1') options.where.isOver = true
	else if (isOver == '0') options.where.isOver = false
	
	if (isLive == '1') options.where.isLive = true
	else if (isLive == '0') options.where.isLive = false
	
	
	// get data
	const result = await gameModel.findAll(options)
	
	res.send(responseTemplate(true, 200, 'data fetched', result))
})


//@desc get league by id
//@route GET /api/league/:id
//@access public
const getGame = asyncHandler(async (req, res) => {
	// read query
	let includeQuery = req.query.include || ''
	includeQuery = includeQuery.split(',')
	
	
	let options = {where : {id : req.params.id}, include : []}
	
	// include teams
	if (includeQuery.includes('team')) {
		options.include.push({
			model : sequelize.models.team,
			as : 'team1',
		})
		
		options.include.push({
			model : sequelize.models.team,
			as : 'team2',
		})
	}
	
	// include league
	if (includeQuery.includes('league')) options.include.push(sequelize.models.league)
	
	// get data
	const result = await gameModel.findOne(options)
	
	res.send(responseTemplate(true, 200, 'data fetched', result))
})

//@desc delete league by id
//@route DELETE /api/league/:id
//@access private
const deleteGame = asyncHandler(async (req, res) => {
	const result = await gameModel.destroy({
		where : {id : req.params.id},
	})
	
	res.send(responseTemplate(true, 200, 'game deleted', {infected : result}))
})

//@desc create league
//@route POST /api/league
//@access private
const createGame = asyncHandler(async (req, res) => {
	const game = req.body
	
	const result = await gameModel.create(game)
	
	res.send(responseTemplate(true, 200, 'game created', result))
})


//@desc updatr league
//@route PUT /api/league/:id
//@access private
const updateGame = asyncHandler(async (req, res) => {
	
	const result = await gameModel.update(req.body, {
		where : {id : req.params.id},
	})
	
	res.send(responseTemplate(true, 200, 'game updated', {infected : result[0]} ))
})

module.exports = {
	getGames, 
	getGame,
	deleteGame,
	createGame,
	updateGame,
}
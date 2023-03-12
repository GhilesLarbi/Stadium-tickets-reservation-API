const sequelize = require('../models')
const db = sequelize.models
const gameModel = sequelize.models.game

const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')

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
	
	res.send(AppRes(200, 'data fetched', result))
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
	
	res.send(AppRes(200, 'data fetched', result))
})

//@desc delete league by id
//@route DELETE /api/league/:id
//@access private
const deleteGame = asyncHandler(async (req, res) => {
	const result = await gameModel.findOne({
		where : {id : req.params.id},
	})
	
	if (!result) throw new AppErr(404, 'No game with id of '+req.params.id, 'gameId')
	
	result.destroy()
	
	res.send(AppRes(200, 'game deleted', result))
})

//@desc create league
//@route POST /api/league
//@access private
const createGame = asyncHandler(async (req, res) => {
	const game = req.body
	
	const league = await db.league.findByPk(game.leagueId)
	if (!league) throw new AppErr(404, 'No league with id of ' + game.leagueId, 'leagueId')
	
	const team1 = await db.team.findByPk(game.team1Id)
	if (!team1) throw new AppErr(404, 'No team with id of ' + game.team1Id, 'team1Id')
	
	const team2 = await db.team.findByPk(game.team2Id)
	if (!team2) throw new AppErr(404, 'No team with id of ' + game.team2Id, 'team2Id')
	
	
	
	const result = await gameModel.create(game)
	
	res.status(201).send(AppRes(201, 'game created', result))
})


//@desc update league
//@route PUT /api/league/:id
//@access private
const updateGame = asyncHandler(async (req, res) => {
	const game = req.body
	
	const league = await db.league.findByPk(game.leagueId)
	if (!league) throw new AppErr(404, 'No league with id of ' + game.leagueId, 'leagueId')
	
	
	const team1 = await db.team.findByPk(game.team1Id)
	if (!team1) throw new AppErr(404, 'No team with id of ' + game.team1Id, 'team1Id')
	
	const team2 = await db.team.findByPk(game.team2Id)
	if (!team2) throw new AppErr(404, 'No team with id of ' + game.team2Id, 'team2Id')
	
	
	
	const result = await gameModel.findOne({
		where : {id : req.params.id},
	})
	
	if (!result) throw new AppErr(404, 'No game with id of '+req.params.id, 'gameId')
	
	result.update(game)
	
	res.send(AppRes(200, 'game updated', result))
})


module.exports = {
	getGames, 
	getGame,
	deleteGame,
	createGame,
	updateGame,
}
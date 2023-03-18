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
	let result
	let option = {
		where : {},
		limit : req.limit,
		offset : req.offset,
		include : [],
	}
	
	console.log(req.offset)
	
	// read queries
	const {isOver, isLive} = req.query
	
	// include teams
	if (req.include.includes('team')) {
		option.include.push({
			model : sequelize.models.team,
			as : 'team1',
		})
		
		option.include.push({
			model : sequelize.models.team,
			as : 'team2',
		})
	}
	
	// include league
	if (req.include.includes('league')) 
		option.include.push(sequelize.models.league)
	
	// filter data
	/*
	if (isOver == '1') option.where.isOver = true
	else if (isOver == '0') option.where.isOver = false
	
	if (isLive == '1') option.where.isLive = true
	else if (isLive == '0') option.where.isLive = false
	*/
	
	// if id query included then drop all filters
	// and return the game
	if (parseInt(req.query.id) >= 0) 
		option.where = {id : req.query.id}
	
	// if count query is present
	if (req.count) {
		option.attributes = [[sequelize.fn('COUNT', sequelize.col('id')), 'count']]
		result = await db.game.findOne(option)
	} else 
		result = await db.game.findAll(option)
	
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
	deleteGame,
	createGame,
	updateGame,
}
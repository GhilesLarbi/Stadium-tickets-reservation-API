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
	let option = req.option

	if (req.count) {
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
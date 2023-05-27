const sequelize = require('../models')
const db = sequelize.models
const gameModel = sequelize.models.game

const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')


const getGames = asyncHandler(async (req, res) => {
	let result
	let option = req.option

	if (req.count) {
		result = await db.game.findOne(option)
	} else 
		result = await db.game.findAll(option)
	
	res.send(AppRes(200, 'data fetched', result))
})


const getGame = asyncHandler(async (req, res) => {
	let option = req.option
	option.where = {id : req.params.id}
	const result = await db.game.findOne(option)
	
	if (!result) throw new AppErr(404, 'game not found', 'gameId')
	
	res.send(AppRes(200, 'data fetched', result))
})

const deleteGame = asyncHandler(async (req, res) => {
	const result = await db.game.findOne({
		where : {id : req.params.id},
	})
	
	if (!result) throw new AppErr(404, 'No game with id of '+req.params.id, 'gameId')
	
	await result.destroy()
	
	res.send(AppRes(200, 'game deleted', result))
})


const createGame = asyncHandler(async (req, res) => {
	const game = req.body
	
  if (game.leagueId) {
	  const league = await db.league.findByPk(game.leagueId)
	  if (!league) throw new AppErr(404, 'No league with id of ' + game.leagueId, 'leagueId')
  }

	const team1 = await db.team.findByPk(game.team1Id)
	if (!team1) throw new AppErr(404, 'Please add team 1', 'team1Id')
	
	const team2 = await db.team.findByPk(game.team2Id)
	if (!team2) throw new AppErr(404, 'Please add team 2', 'team2Id')
	
	
	const result = await db.game.create(game)
	
	res.status(201).send(AppRes(201, 'game created', result))
})


const updateGame = asyncHandler(async (req, res) => {
	const game = req.body
	
  if (game.leagueId) {
	  const league = await db.league.findByPk(game.leagueId)
	  if (!league) throw new AppErr(404, 'No league with id of ' + game.leagueId, 'leagueId')
  }
	
	const team1 = await db.team.findByPk(game.team1Id)
	if (!team1) throw new AppErr(404, 'No team with id of ' + game.team1Id, 'team1Id')
	
	const team2 = await db.team.findByPk(game.team2Id)
	if (!team2) throw new AppErr(404, 'No team with id of ' + game.team2Id, 'team2Id')
	
	
	
	const result = await db.game.findOne({
		where : {id : req.params.id},
	})
	
	if (!result) throw new AppErr(404, 'No game with id of '+req.params.id, 'gameId')
	
	await result.update(game)
	
	res.send(AppRes(200, 'game updated', result))
})


module.exports = {
	getGames, 
	getGame,
	deleteGame,
	createGame,
	updateGame,
}

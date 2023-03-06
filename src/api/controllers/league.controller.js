const sequelize = require('../models')
const leagueModel = sequelize.models.league

const asyncHandler = require('../../utils/asyncErrorHandler')
const responseTemplate = require('../../utils/responseTemplate')

//@desc get leagues
//@route GET /api/league
//@access public
const getLeagues = asyncHandler(async (req, res) => {
	const includeQuery = req.query.include || ''
	let options = {}
	
	if (includeQuery.length > 0) 
		options.include = sequelize.models.game
	
	const result = await leagueModel.findAll(options)
	
	res.send(responseTemplate(true, 200, 'data fetched', result))
})


//@desc get league by id
//@route GET /api/league/:id
//@access public
const getLeague = asyncHandler(async (req, res) => {
	const includeQuery = req.query.include || ''
	let options = {where : {id : req.params.id}}
	
	if (includeQuery.length > 0) 
		options.include = sequelize.models.game
	
	const result = await leagueModel.findOne(options)
	
	res.send(responseTemplate(true, 200, 'data fetched', result))
})

//@desc delete league by id
//@route DELETE /api/league/:id
//@access private
const deleteLeague = asyncHandler(async (req, res) => {
	const result = await leagueModel.destroy({
		where : {id : req.params.id},
	})
	
	res.send(responseTemplate(true, 200, 'league deleted', {infected : result}))
})

//@desc create league
//@route POST /api/league
//@access private
const createLeague = asyncHandler(async (req, res) => {
	const league = req.body
	
	const result = await leagueModel.create(league)
	
	res.send(responseTemplate(true, 200, 'league created', result))
})


//@desc updatr league
//@route PUT /api/league/:id
//@access private
const updateLeague = asyncHandler(async (req, res) => {
	const league = req.body
	
	const result = await leagueModel.update(league, {
		where : {id : req.params.id},
	})
	
	res.send(responseTemplate(true, 200, 'league created', {infected : result[0]}))
})

module.exports = {
	getLeagues, 
	getLeague,
	deleteLeague,
	createLeague,
	updateLeague,
}
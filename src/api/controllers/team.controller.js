const sequelize = require('../models')
const teamModel = sequelize.models.team

const asyncHandler = require('../../utils/asyncErrorHandler')
const responseTemplate = require('../../utils/responseTemplate')

//@desc get all teams
//@route GET /api/team
//@access public
const getTeams = asyncHandler(async (req, res) => {
	const result = await teamModel.findAll()
	
	res.send(responseTemplate(true, 200, 'data fetched', result))
})


//@desc get single team
//@route GET /api/team/:id
//@access public
const getTeam = asyncHandler(async (req, res) => {
	const result = await teamModel.findOne({
		where : {id : req.params.id},
	})
	
	res.send(responseTemplate(true, 200, 'data fetched', result))
})


//@desc create team
//@route POST /api/team
//@access private
const createTeam = asyncHandler(async (req, res) => {
	const team = req.body
	const result = await teamModel.create(team)
	
	res.send(responseTemplate(true, 200, 'team created', result))
})

//@desc update team
//@route PUT /api/team/:id
//@access private
const updateTeam = asyncHandler(async (req, res) => {
	const team = req.body
	const result = await teamModel.update(team, {
		where : {id : req.params.id},
	})
	
	res.send(responseTemplate(true, 200, 'team updated', {infected : result[0]}))
})


//@desc delete team
//@route DELETE /api/team/:id
//@access private
const deleteTeam = asyncHandler(async (req, res) => {
	const team = req.body
	const result = await teamModel.destroy({
		where : {id : req.params.id},
	})
	
	res.send(responseTemplate(true, 200, 'team deleted', {infected : result}))
})

module.exports = {
	getTeams,
	getTeam,
	createTeam,
	updateTeam,
	deleteTeam,
}
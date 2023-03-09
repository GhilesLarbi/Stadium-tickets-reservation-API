const sequelize = require('../models')
const teamModel = sequelize.models.team

const asyncHandler = require('../../utils/asyncErrorHandler')
const responseTemplate = require('../../utils/responseTemplate')
const path = require('path')

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


//@desc upload team logo
//@route POST /api/team/:id/upload/logo
//@access private
const uploadLogo = asyncHandler(async (req, res) => {
	let logo
	try {
		logo = req.files.logo
	} catch (err) {
		throw new Error('bad body data')
	}
	
	// throw an error if no logo found
	if (!logo) throw new Error('no logo found')
	
	// FIXME
	// If does not have image mime type prevent from uploading
	//if (/^logo/.test(logo.mimetype)) throw new Error('Doesn\'t look like an image')
	// if (logo.mimetype.match(/^image/)) console.log('it\'s an image')
	// else console.log('it\'s not an image')

 
	// generate a random unique name for the image
	// get league name
	const team = await teamModel.findByPk(req.params.id)
	
	if (!team) throw new Error('no team with ' + req.params.id + ' id found')
	// FIXME
	// get the image extension instead
	let teamImagePath = team.name + team.id + '.png'
	
	logo.mv(path.join(__dirname + '/../../images/team/' + teamImagePath))
	
	// save the image path in database
	team.logo = '/images/team/' + teamImagePath
	
	await team.save()
	
	res.send(responseTemplate(true, 200, 'logo updated', team))
})


module.exports = {
	getTeams,
	getTeam,
	createTeam,
	updateTeam,
	deleteTeam,
	uploadLogo,
}
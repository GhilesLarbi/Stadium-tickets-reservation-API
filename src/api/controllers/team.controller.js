const sequelize = require('../models')
const db = sequelize.models

const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')
const path = require('path')

//@desc get all teams
//@route GET /api/team
//@access public
const getTeams = asyncHandler(async (req, res) => {
	let result
	let option = req.option
	
	// count
	if (req.count) {
		result = await db.team.findOne(option)
	} else {
		result = await db.team.findAll(option)
		
		// delete team1 && team2 and replace them with games 
		for (let i = 0; i < result.length; i++) {
			result[i] = result[i].toJSON()
			
			if (result[i].team1 && result[i].team1) {
				result[i].games = []
				for (let j = 0; j < result[i].team1.length ; j++) 
					result[i].games.push(result[i].team1[j])
				for (let j = 0; j < result[i].team2.length ; j++)
					result[i].games.push(result[i].team2[j])
				
				delete result[i].team1
				delete result[i].team2
			}
			
		}
	}
	
	res.send(AppRes(200, 'data fetched', result))
})


//@desc get single team
//@route GET /api/team/:id
//@access public
const getTeam = asyncHandler(async (req, res) => {
	const result = await db.team.findOne({
		where : {id : req.params.id},
	})
	
	if (!result) throw new AppErr(404, 'No team with id of '+req.params.id, 'teamId')
	
	res.send(AppRes(200, 'data fetched', result))
})


//@desc create team
//@route POST /api/team
//@access private
const createTeam = asyncHandler(async (req, res) => {
	const team = req.body
	const result = await db.team.create(team)
	
	res.status(201).send(AppRes(201, 'team created', result))
})

//@desc update team
//@route PUT /api/team/:id
//@access private
const updateTeam = asyncHandler(async (req, res) => {
	const team = req.body
	delete team.logo
	
	let result = await db.team.findOne({
		where : {id : req.params.id},
	})
	
	if (!result) throw new AppErr(404, 'No team with id of '+req.params.id, 'teamId')
	
	result.update(team)
	
	res.send(AppRes(200, 'team updated', result))
})


//@desc delete team
//@route DELETE /api/team/:id
//@access private
const deleteTeam = asyncHandler(async (req, res) => {
	const result = await db.team.findOne({
		where : {id : req.params.id},
	})
	
	if (!result) throw new AppErr(404, 'No team with id of '+req.params.id, 'teamId')
	
	result.destroy()
	
	res.send(AppRes(200, 'team deleted', result))
})


//@desc upload team logo
//@route POST /api/team/:id/upload/logo
//@access private
const uploadLogo = asyncHandler(async (req, res) => {
	let logo
	try {
		logo = req.files.logo
	} catch (err) {
		throw new AppErr(400, 'file is expected', 'file')
	}
	
	// throw an error if no logo found
	if (!logo) throw new AppErr(400, 'logo is expected', 'logo')
	
	// FIXME
	// If does not have image mime type prevent from uploading
	//if (/^logo/.test(logo.mimetype)) throw new Error('Doesn\'t look like an image')
	// if (logo.mimetype.match(/^image/)) console.log('it\'s an image')
	// else console.log('it\'s not an image')

 
	// generate a random unique name for the image
	// get league name
	const team = await db.team.findByPk(req.params.id)
	
	if (!team) throw new AppErr(400, 'no team with ' + req.params.id + ' id found', 'teamId')
	
	// get the image extension
	let extension = logo.name.split('.')
	extension = '.' + extension[extension.length -1].toLowerCase()
	
	
	let teamImagePath = team.name.toLowerCase() + team.id + extension
	
	logo.mv(path.join(__dirname + '/../../images/team/' + teamImagePath))
	
	// save the image path in database
	team.logo = '/images/team/' + teamImagePath
	await team.save()
	
	res.send(AppRes(200, 'logo updated', team))
})


module.exports = {
	getTeams,
	getTeam,
	createTeam,
	updateTeam,
	deleteTeam,
	uploadLogo,
}
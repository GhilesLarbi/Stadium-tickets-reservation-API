const sequelize = require('../models')
const db = sequelize.models

const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')
const path = require('path')
const fs = require('fs')


//@route GET /team
//@middlewares queryHandler
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


//@route GET /team/:id
//@middlewares queryHandler
const getTeam = asyncHandler(async (req, res) => {
	let option = req.option 
	option.where = {id : req.params.id}
	
	let result = await db.team.findOne(option)
	
	if (!result) throw new AppErr(404, 'No team with id of '+req.params.id, 'teamId')
	// delete team1 && team2 and replace them with games
	result = result.toJSON()
	if (result.team1 && result.team1) {
		result.games = [] 
		result.team1.forEach(game => {
			result.games.push(game)
		})
		result.team2.forEach(game => {
			result.games.push(game)
		})
		
		delete result.team1
		delete result.team2
	}
	
	
	res.send(AppRes(200, 'data fetched', result))
})


//@route POST /team
//@middlewares authenticate => role(admin)
const createTeam = asyncHandler(async (req, res) => {
	const team = req.body
	const result = await db.team.create(team)
	
	res.status(201).send(AppRes(201, 'team created', result))
})


//@route PUT /team/:id
//@middlewares authenticate => role(admin)
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


//@route DELETE /team/:id
//@middlewares authenticate => role(admin)
const deleteTeam = asyncHandler(async (req, res) => {
	const result = await db.team.findOne({
		where : {id : req.params.id},
	})
	
	if (!result) throw new AppErr(404, 'No team with id of '+req.params.id, 'teamId')
  
  // delete logo if any
  if (path.basename(result.logo) != "default.svg")
    fs.unlinkSync(path.join(__dirname + '../../../images/team/' + path.basename(result.logo)))

	result.destroy()
	res.send(AppRes(200, 'team deleted', result))
})


//@route POST /team/:id/upload/logo
//@middlewares authenticate => role(admin)
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
	// if (/^logo/.test(logo.mimetype)) throw new Error('Doesn\'t look like an image')
	if (! logo.mimetype.match(/^image/)) throw new AppErr(300, "Doesn't look like an image", "logo")

	// get team
	const team = await db.team.findByPk(req.params.id)
	
	if (!team) throw new AppErr(400, 'no team with ' + req.params.id + ' id found', 'teamId')
	
	// get the image extension
	let extension = logo.name.split('.')
	extension = '.' + extension[extension.length -1].toLowerCase()
	
	
	let teamImage = team.name.toLowerCase() + '_' + team.id + extension
	
	logo.mv(path.join(__dirname + '../../../images/team/' + teamImage))
	
	// save the image path in database
	team.logo = teamImage
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

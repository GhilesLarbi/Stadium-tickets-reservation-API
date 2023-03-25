const sequelize = require('../models')
const db = sequelize.models
const { Op } = require('sequelize');

const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')
const path = require('path')


const getLeagues = asyncHandler(async (req, res) => {
	let result
	let option = req.option 
	
	// count
	if (req.count) {
		result = await db.league.findOne(option)
	} else {
		result = await db.league.findAll(option)
	}
	
	res.send(AppRes(200, 'data fetched', result))
})


const getLeague = asyncHandler(async (req, res) => {
	const option = req.option
	option.where = {id : req.params.id}
	
	const result = await db.league.findOne(option)
	
	res.send(AppRes(200, 'data fetched', result))
})


const deleteLeague = asyncHandler(async (req, res) => {
	const result = await db.league.findOne({
		where : {id : req.params.id},
	})
	
	if (!result) throw new AppErr(404, 'No league with id of '+req.params.id, 'leagueId')
	
	result.destroy()
	
	res.send(AppRes(200, 'league deleted', result))
})


const createLeague = asyncHandler(async (req, res) => {
	const league = req.body
	
	const result = await db.league.create(league)
	
	
	res.status(201).send(AppRes(201, 'league created', result))
})


const updateLeague = asyncHandler(async (req, res) => {
	const league = req.body
	delete league.logo
	
	const result = await db.league.findOne({
		where : {id : req.params.id},
	})
	
	if (!result) throw new AppErr(404, 'No league with id of '+req.params.id, 'leagueId')
	
	result.update(league)
	
	res.send(AppRes(200, 'league created', result))
})


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
 
 
	// get league name
	const league = await db.league.findByPk(req.params.id)
	
	if (!league) throw new AppErr(400, 'no team with ' + req.params.id + ' id found', 'leagueId')
	
	// get the image extension
	let extension = logo.name.split('.')
	extension = '.' + extension[extension.length -1].toLowerCase()
	
	let leagueImage = league.name.toLowerCase() + '_' + league.id + extension
	
	logo.mv(path.join(__dirname + '/../images/league/' + leagueImage))
	
	// save the image path in the database
	league.logo = leagueImage
	
	await league.save()
	
	res.send(AppRes(200, 'logo updated', league))
})

module.exports = {
	getLeagues, 
	getLeague,
	deleteLeague,
	createLeague,
	updateLeague,
	uploadLogo,
}
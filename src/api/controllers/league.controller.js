const sequelize = require('../models')
const db = sequelize.models
const leagueModel = sequelize.models.league
const { Op } = require('sequelize');

const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')
const path = require('path')

//@desc get leagues
//@route GET /api/league
//@access public
const getLeagues = asyncHandler(async (req, res) => {
	let result
	let option = {
		where : {},
		limit : req.limit,
		offset : req.offset,
		// raw : true
	}
	
	// include game
	if (req.include.includes('game') ) 
		option.include = db.game
	
	// name
	if (req.query.name)
		option.where.name =  {[Op.substring]: req.query.name}
	
	// id
	if (parseInt(req.query.id))
		option.where.id = req.query.id
	
	
	// count
	if (req.count) {
		option.attributes = [[sequelize.fn('COUNT', sequelize.col('id')), 'count']]
		result = await leagueModel.findOne(option)
		
	} else {
		result = await leagueModel.findAll(option)
	}
	
	res.send(AppRes(200, 'data fetched', result))
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
	
	res.send(AppRes(200, 'data fetched', result))
})

//@desc delete league by id
//@route DELETE /api/league/:id
//@access private
const deleteLeague = asyncHandler(async (req, res) => {
	const result = await leagueModel.findOne({
		where : {id : req.params.id},
	})
	
	if (!result) throw new AppErr(404, 'No league with id of '+req.params.id, 'leagueId')
	
	result.destroy()
	
	res.send(AppRes(200, 'league deleted', result))
})

//@desc create league
//@route POST /api/league
//@access private
const createLeague = asyncHandler(async (req, res) => {
	const league = req.body
	
	const result = await leagueModel.create(league)
	
	
	res.status(201).send(AppRes(201, 'league created', result))
})


//@desc update league
//@route PUT /api/league/:id
//@access private
const updateLeague = asyncHandler(async (req, res) => {
	const league = req.body
	delete league.logo
	
	const result = await leagueModel.findOne({
		where : {id : req.params.id},
	})
	
	if (!result) throw new AppErr(404, 'No league with id of '+req.params.id, 'leagueId')
	
	result.update(league)
	
	res.send(AppRes(200, 'league created', result))
})


//@desc upload league logo
//@route POST /api/league/:id/upload/logo
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
	const league = await leagueModel.findByPk(req.params.id)
	
	if (!league) throw new AppErr(400, 'no team with ' + req.params.id + ' id found', 'leagueId')
	
	// get the image extension
	let extension = logo.name.split('.')
	extension = '.' + extension[extension.length -1].toLowerCase()
	
	let leagueImagePath = league.name.toLowerCase() + league.id + extension
	
	logo.mv(path.join(__dirname + '/../../images/league/' + leagueImagePath))
	
	// save the image path in the database
	league.logo = '/images/league/' + leagueImagePath
	
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
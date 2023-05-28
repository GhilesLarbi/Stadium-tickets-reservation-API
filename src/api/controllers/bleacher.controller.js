const sequelize = require('../models')
const db = sequelize.models

const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')


const getBleachers = asyncHandler(async (req, res) => {
	let result
	let option = req.option 
	
	// if count query is present
	if (req.count) {
		result = await db.bleacher.findOne(option)
	} else {
		result = await db.bleacher.findAll(option)
		
		
		
		// get all games ids
		let games = await db.game.findAll({
			attributes : ['id'],
			raw : true
		})
		
		games = games.map(obj => obj.id)
		
		for (let i = 0; i < result.length; i++) {
			result[i] = result[i].toJSON()
			result[i].tickets = []
			
			for (let j = 0; j < games.length; j++) {
				const count =  (await db.ticket.findAll({
					where : {
						bleacherType : result[i].type,
						gameId : games[j],
					},
					raw : true,
				})).length
				
				if (count != 0)
					result[i].tickets.push({
						gameId : games[j],
						freePlaces : result[i].quantity - count,
						takenPlaces : count
					})
			}
			
		}
		
	}
	
	res.send(AppRes(200, 'data fetched', result))
})


const getBleacher = asyncHandler(async (req, res) => {
	const option = req.option
	option.where = {type : req.params.type}
	let result = await db.bleacher.findOne(option)
	
	// if no bleacher found send error msg
	if (!result) throw new AppErr(404, req.params.type + ' bleacher not found', 'bleacherType')
	
	// get all games ids
	let games = await db.game.findAll({
		attributes : ['id'],
		raw : true
	})
		
	games = games.map(obj => obj.id)
	result = result.toJSON()
	result.tickets = []
	
	for (let i = 0; i < games.length; i++) {
		const count =  (await db.ticket.findOne({
			attributes : [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
			where : {
				bleacherType : result.type,
				gameId : games[i],
			},
					
			raw : true,
		})).count
				
		if (count != 0)
			result.tickets.push({
				gameId : games[i],
				freePlaces : result.quantity - count,
				takenPlaces : count
			})
	}
	
	res.send(AppRes(200, 'data fetched', result))
})


const createBleacher = asyncHandler(async (req, res) => {
	const bleacher = {...req.body}
	
	// FIXME
	// check the bleacher params before updating it
	
	const result = await db.bleacher.create(bleacher)
	
	res.status(201).send(AppRes(201, 'bleacher created', result))
})


const updateBleacher = asyncHandler(async (req, res) => {
	const bleacher = req.body
	
	// FIXME
	// check the bleacher params before updating it
	
	let result = await db.bleacher.findOne({
		where : {type : req.params.type},
	})
	
	if (!result) throw new AppErr(404, 'No bleacher with type of '+req.params.type, 'bleacherType')
	
	await result.update(bleacher)
	
	// for some reason the type is not changing
	// result.dataValues.type = bleacher.type
	// result.save()
	
	res.send(AppRes(200, 'bleacher updated', result))
})


const deleteBleacher = asyncHandler(async (req, res) => {
	const result = await db.bleacher.findOne({
		where : {type : req.params.type},
	})
	
	if (!result) throw new AppErr(404, 'No bleacher with type of '+req.params.type, 'bleacherType')
	
	result.destroy()
	
	res.send(AppRes(200, 'bleacher deleted', {infected :result}))
})

module.exports = {
	getBleachers,
	getBleacher,
	createBleacher,
	updateBleacher,
	deleteBleacher,
}

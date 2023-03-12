const sequelize = require('../api/models')
const db = sequelize.models
const {Op} = require('sequelize')
const AppErr = require('./AppErr')


// return array of taken seat IDs
async function takenSeats(gameId) {
	// find all seatId of tickets with same gameId
	let takenSeats = await db.ticket.findAll({
		where : {
			gameId : gameId,
		},
		
		attributes : ['seatId'],
		raw : true,
	})
	return takenSeats.map(object => object.seatId)
}


// return number of available seats
async function availableSeatsPerBleacher(gameId, bleacherType) {
	const seats = await db.seat.findOne({
		attributes : [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
		where : {
			id : {[Op.notIn]: await takenSeats(gameId)},
			bleacherType : bleacherType,
		},
		raw : true,
	})
	
	return seats.count
}


// return object of available seats per bleacher && game
async function availableSeats(gameId) {
	const bleachers = await db.bleacher.findAll({
		attributes : ['type'],
		raw : true,
	})
	
	if (gameId)
		for (let i = 0; i < bleachers.length; i++)
			bleachers[i].availableSeats = await availableSeatsPerBleacher(gameId, bleachers[i].type)
	else {
		const games = await db.game.findAll({
			attributes : ['id'],
			raw : true,
		})
	
		for (let i = 0; i < bleachers.length; i++) {
			bleachers[i].games = []
			for (let j = 0; j < games.length; j++)
				bleachers[i].games.push({
					gameId : games[j].id,
					availableSeats : await availableSeatsPerBleacher(games[j].id, bleachers[i].type)
				})
		}
	}
	
	return bleachers
}




async function findFreeSeat(gameId, bleacherType) {
	let seats = await db.seat.findAll({
		where : {
			bleacherType : bleacherType,
			id : {[Op.notIn]: await takenSeats(gameId)},
		},
		
		attributes : ['id'],
		raw : true,
	})
	
	// convert to array
	seats = seats.map(object => object.id);
	
	return seats[0]
}

module.exports = {
	findFreeSeat,
	takenSeats,
	availableSeatsPerBleacher,
	availableSeats,
}
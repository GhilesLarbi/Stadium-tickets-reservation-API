const sequelize = require('../api/models')
const db = sequelize.models

async function findFreeSeat(gameId, bleacherType) {
	// find all tickets with same gameId
	let tickets = await db.ticket.findAll({
		where : {
			gameId : gameId,
		},
		
		attributes : ['seatId'],
		raw : true,
	})
	
	// convert to array
	tickets = tickets.map(object => object.seatId);
	// convert to a set
	const toRemove = new Set(tickets)
	
	// find all seats with same bleacherType
	let seats = await db.seat.findAll({
		where : {
			bleacherType : bleacherType,
		},
		
		attributes : ['id'],
		raw : true,
	})
	
	
	// convert to array
	seats = seats.map(object => object.id);
	
	// get difference
	const difference = seats.filter( seat => !toRemove.has(seat) );

	// return random seat
	return difference[Math.floor(Math.random()*difference.length)];
}

module.exports = findFreeSeat
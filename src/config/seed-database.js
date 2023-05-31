const dotenv = require('dotenv')
dotenv.config( {
	path: __dirname + '/../../.env'
})

const sequelize = require('../api/models');
const db = sequelize.models

const bleachers = [
	{
		type: 'VIP',
		price: 2000,
		quantity: 300,
	},

	{
		type: 'LB',
		price: 300,
		quantity: 5000,
	},

	{
		type: 'LT',
		price: 500,
		quantity: 3000,
	},

	{
		type: 'BB',
		price: 400,
		quantity: 12000,
	},

	{
		type: 'BT',
		price: 600,
		quantity: 9000,
	},

	{
		type: 'RB',
		price: 300,
		quantity: 5000,
	},

	{
		type: 'RT',
		price: 500,
		quantity: 3000,
	},
]

const users = [
	{
		username: 'ghiles larbi',
		password: '123',
		email: 'hinrobalas@gmail.com',
		isEmailConfirmed: true,
		phone: '0667667067',
		nationalNumber: '663882997629',
	},
]


const tickets = [
	{
		userId : 1,
		gameId : 1,
		bleacherType : "VIP",
	},
	{
		userId : 1,
		gameId : 2,
		bleacherType : "VIP",
	},
	{
		userId : 1,
		gameId : 3,
		bleacherType : "VIP",
	},
	{
		userId : 1,
		gameId : 4,
		bleacherType : "VIP",
	},
	{
		userId : 1,
		gameId : 5,
		bleacherType : "VIP",
	},
]

const games = [
	{
		date: new Date('2023-7-25'),
		description: 'demi-final',
		leagueId: null,
		team1Id: 1,
		team2Id: 4,
		score: null,
	},
	{
		date: new Date('2023-11-9'),
		description: 'semi-final',
		leagueId: 1,
		team1Id: 1,
		team2Id: 2,
		score: null,
	},

	{
		date: new Date('2023-9-15'),
		description: 'final',
		leagueId: 1,
		team1Id: 1,
		team2Id: 3,
		score: null,
	},

	{
		date: new Date('2023-2-22'),
		description: 'demi-final',
		leagueId: 2,
		team1Id: 1,
		team2Id: 4,
		score: '5-1',
	},

	{
		date: new Date('2023-2-3'),
		leagueId: 3,
		team1Id: 1,
		team2Id: 2,
		score: '3-0',
	},
]

const teams = [
	{
		name: 'jsk',
		logo: 'jsk.png',
	},

	{
		name: 'usma',
		logo: 'usma.png',
	},

	{
		name: 'crb',
		logo: 'crb.png',
	},

	{
		name: 'mca',
		logo: 'mca.png',
	},
]

const leagues = [
	{
		name: 'CAC',
		logo: 'can.png',
	},

	{
		name: 'CAF',
		logo: 'caf.jpg',
	},

	{
		name: 'LFP',
		logo: 'cla.png',
	},
]

// check connection
async function assertDatabaseConnectionOk() {
	console.log('(!) Checking database connection ...');
	try {
		await sequelize.authenticate();
		console.log('(+) Database connection OK!');
	} catch (error) {
		console.log('(-) Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}



// create tables
async function createTables(config) {
	await assertDatabaseConnectionOk()
	try {
		await sequelize.sync(config)
		console.log('(+) Tables created');

		await db.user.bulkCreate(users, {
			validate: true, individualHooks: true
		})
		console.log('(+) Done seeding User table')

		await db.bleacher.bulkCreate(bleachers, {
			validate: true, individualHooks: true
		})
		console.log('(+) Done seeding Bleacher table')

		await db.team.bulkCreate(teams, {
			validate: true, individualHooks: true
		})
		console.log('(+) Done seeding Team table')

		await db.league.bulkCreate(leagues, {
			validate: true, individualHooks: true
		})
		console.log('(+) Done seeding League table')

		await db.game.bulkCreate(games, {
			validate: true, individualHooks: true
		})
		console.log('(+) Done seeding Game table')

		await db.ticket.bulkCreate(tickets, {
			// validate: true, individualHooks: true
		})
		console.log('(+) Done seeding Ticket table')
		
		process.exit(0)

	} catch (err) {
		console.log('(-) somthing went wrong')
		console.log(err)
		process.exit(1)
	}
}
createTables( {
	force: true
})

const dotenv = require('dotenv')
dotenv.config( {
	path: __dirname + '/../../.env'
})

const sequelize = require('../api/models');
const db = sequelize.models

const bleachers = [
	{
		type: 'vip',
		price: 2000,
		quantity: 300,
	},

	{
		type: 'ET',
		price: 300,
		quantity: 5000,
	},

	{
		type: 'EB',
		price: 500,
		quantity: 3000,
	},

	{
		type: 'NT',
		price: 400,
		quantity: 12000,
	},

	{
		type: 'NB',
		price: 600,
		quantity: 9000,
	},

	{
		type: 'WT',
		price: 300,
		quantity: 5000,
	},

	{
		type: 'WB',
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

	{
		username: 'nacer laribi',
		password: '1234',
		email: 'nacer@gmail.com',
		isEmailConfirmed: false,
		phone: '0736382693',
		nationalNumber: '663882997674',
	},

	{
		username: 'ania larbi',
		password: '12345',
		email: 'ania@gmail.com',
		isEmailConfirmed: false,
		phone: '0538297442',
		nationalNumber: '663882988379',
	},

	{
		username: 'karim khelfaoui',
		password: '123456',
		email: 'karim@gmail.com',
		isEmailConfirmed: true,
		phone: '0732720761',
		nationalNumber: '663882937382',
	},
]

const games = [
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
		logo: 'jsk_1.svg',
	},

	{
		name: 'usma',
		logo: 'usma_2.png',
	},

	{
		name: 'crb',
		logo: 'crb_3.png',
	},

	{
		name: 'mca',
		logo: 'mca_4.png',
	},
]

const leagues = [
	{
		name: 'can',
		logo: 'can_1.png',
	},

	{
		name: 'caf',
		logo: 'caf_2.jpg',
	},

	{
		name: 'cla',
		logo: 'cla_3.png',
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

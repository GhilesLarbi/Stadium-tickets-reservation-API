const dotenv = require('dotenv')
dotenv.config({path : '/root/backend/.env'})

const sequelize = require('../api/models');

const bleachers = [
	{
		type : 'VIP',
		price : 2000,
		quantity : 300,
	},
	
	{
		type : 'ET',
		price : 300,
		quantity : 5000,
	},
	
	{
		type : 'EB',
		price : 500,
		quantity : 3000,
	},
	
	{
		type : 'NT',
		price : 400,
		quantity : 12000,
	},
	
	{
		type : 'NB',
		price : 600,
		quantity : 9000,
	},
	
	{
		type : 'WT',
		price : 300,
		quantity : 5000,
	},
	
	{
		type : 'WB',
		price : 500,
		quantity : 3000,
	},
]

const users = [
	{
		username : 'ghiles1',
		firstname : 'ghiles',
		lastname : 'larbi',
		password : '123',
		email : 'hinrobalas@gmail.com',
		isEmailConfirmed : true,
		phone : '0667667067',
		nationalNumber : '663882997629',
	},
	
	{
		username : 'nacer123',
		firstname : 'nacer',
		lastname : 'laribi',
		password : '1234',
		email : 'nacer@gmail.com',
		isEmailConfirmed : false,
		phone : '0736382693',
		nationalNumber : '663882997674',
	},
	
	{
		username : 'ania987',
		firstname : 'ania',
		lastname : 'larbi',
		password : '12345',
		email : 'ania@gmail.com',
		isEmailConfirmed : false,
		phone : '0538297442',
		nationalNumber : '663882988379',
	},
	
	{
		username : 'karim25',
		firstname : 'karim',
		lastname : 'khelfaoui',
		password : '123456',
		email : 'karim@gmail.com',
		isEmailConfirmed : true,
		phone : '0732720761',
		nationalNumber : '663882937382',
	},
]

const games = [
	{
		date : new Date('2023-4-9'),
		description : 'semi-final',
		leagueId : 1,
		team1Id : 1,
		team2Id : 2,
		score : null,
	},
	
	{
		date : new Date('2023-3-15'),
		description : 'final',
		leagueId : 1,
		team1Id : 1,
		team2Id : 3,
		score : null,
	},
	
	{
		date : new Date('2023-2-22'),
		description : 'demi-final',
		isOver : true,
		leagueId : 2,
		team1Id : 1,
		team2Id : 4,
		score : '5-1',
	},
	
	{
		date : new Date('2023-2-3'),
		isOver : true,
		leagueId : 3,
		team1Id : 1,
		team2Id : 2,
		score : '3-0',
	},
]

const teams = [
	{
		name : 'JSK',
		logo : '/images/team/jsk.png',
	},
	
	{
		name : 'USMA',
		logo : '/images/team/usma.png',
	},
	
	{
		name : 'CRB',
		logo : '/images/team/crb.png',
	},
	
	{
		name : 'MCA',
		logo : '/images/team/mca.png',
	},
]

const leagues = [
	{
		name : 'CAN',
		logo : '/images/league/can.png',
	},
	
	{
		name : 'CAF',
		logo : '/images/league/caf.jpg',
	},
	
	{
		name : 'CLA',
		logo : '/images/league/cla.png',
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
		
		await sequelize.models.user.bulkCreate(users, {validate : true, individualHooks: true})
		console.log('(+) Done seeding User table')
		
		await sequelize.models.bleacher.bulkCreate(bleachers, {validate : true, individualHooks: true})
		console.log('(+) Done seeding Bleacher table')
		
		await sequelize.models.team.bulkCreate(teams, {validate : true, individualHooks: true})
		console.log('(+) Done seeding Team table')
		
		await sequelize.models.league.bulkCreate(leagues, {validate : true, individualHooks: true})
		console.log('(+) Done seeding League table')
		
		await sequelize.models.game.bulkCreate(games, {validate : true, individualHooks: true})
		console.log('(+) Done seeding Game table')
		
		
		// generate seats
		const blchrs = await sequelize.models.bleacher.findAll({
			attributes : ['type'],
		})
		
		const letters = 'ABCDEF'
		let seat = {}
		for (let i = 0; i < blchrs.length; i++){
			for (let j = 0; j < letters.length; j++) {
				for (let k = 1; k < 10; k++) {
					seat.code = letters[j] + k;
					seat.bleacherType = blchrs[i].type
					
					await sequelize.models.seat.create(seat)
				}
			}
		}
		
		console.log('(+) Done generating seats')
		
		
		/*
		const test = await sequelize.models.game.findAll({
			include: [
				{
					model: sequelize.models.team,
					as: 'team1',
				},
				
				{
					model: sequelize.models.team,
					as: 'team2',
				},
			],
		})
		
		test.forEach(game => {
			console.log(game.toJSON())
		})
		*/
		
		
		process.exit(0)
		
	} catch (err) {
		console.log('(-) somthing went wrong')
		console.log(err)
		process. exit(1)
	}
}
createTables({force : true})



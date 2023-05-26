
const dotenv = require('dotenv')
dotenv.config( {
	path: __dirname + '/../../.env'
})

const sequelize = require('../api/models');
const { Op } = require('sequelize');
const db = sequelize.models




const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

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
    const users = await db.user.findAll({
      attributes : ["id"],
      raw : true
    })


    const games = await db.game.findAll({
      attributes : ["id"],
      where : {
        date : {[Op.gt] : new Date()}
      },
      raw : true
    })

    const bleachers = await db.bleacher.findAll({
      attributes : ["type", "quantity"],
      raw : true,
    })


    for (let i=0; i < users.length; i++) {
      for (let j=0; j < games.length; j++) {
        for (let k=0; k < bleachers.length; k++) {
          console.log(`(+) user : ${users[i].id}`)
          console.log(`    game : ${games[j].id}`)
          console.log(`    bleacher : ${bleachers[k].type}`)
          console.log(`\n\n`)

          for (let l = 0; l < random(bleachers[k].quantity/10, bleachers[k].quantity - 1); l++) {
            await db.ticket.create({
              userId : users[i].id,
              gameId : games[j].id,
              bleacherType : bleachers[k].type,
            }, {validate :  false} )
          }
        }
      }
    }


	// 	userId : 1,
	// 	gameId : 1,
	// 	bleacherType : "VIP",
	// },


		// await db.ticket.bulkCreate(tickets, {
		// 	// validate: true, individualHooks: true
		// })
		// console.log('(+) Done seeding Ticket table')
		
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

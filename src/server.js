const dotenv = require('dotenv')
dotenv.config({path : '.env'})

const server = require('./app/app')
const sequelize = require('./api/models');

const PORT = process.env.PORT || 3000


async function assertDatabaseConnectionOk() {
	console.log('(!) Checking database connection ...');
	try {
		await sequelize.authenticate();
		// await sequelize.sync()
		console.log('(+) Database connection OK!');
	} catch (error) {
		console.log('(-) Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();

	server.listen(PORT, () => {
		console.log('(+) Server listening on port', PORT, '...')
	});
}

init();
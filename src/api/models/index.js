const { Sequelize } = require('sequelize')
const { applyExtraSetup } = require('./extra-setup')

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host : process.env.DB_HOST,
		port : process.env.DB_PORT,
		dialect : "mariadb",
		define : {
			freezeTableName : true,
			timestamps : false,
		},
		logging : false,
	}
)

const modelDefiners = [
	require('./tables/user.model'),
	require('./tables/ticket.model'),
	require('./tables/team.model'),
	require('./tables/game.model'),
	require('./tables/league.model'),
	require('./tables/bleacher.model'),
	require('./tables/seat.model'),
	// Add more models here...
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize)
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize)

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize
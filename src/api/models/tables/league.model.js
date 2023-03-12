const {DataTypes} = require('sequelize')

// ticket modele
module.exports = (sequelize) => {
	sequelize.define('league', {
		id : {
			type : DataTypes.INTEGER,
			allowNull : false,
			unique : true,
			autoIncrement : true,
			primaryKey : true,
		},
	
		name : {
			type : DataTypes.STRING,
			allowNull : false,
			unique : true,
			validate: {
				notEmpty : {
					msg : 'League name cannot be empty',
				},
				
				notNull : {
					msg : 'League name cannot be null',
				},
			},
		},
		
		logo : {
			type : DataTypes.STRING,
			allowNull : false,
			defaultValue : '/images/league/default.png',
		},
	})
}
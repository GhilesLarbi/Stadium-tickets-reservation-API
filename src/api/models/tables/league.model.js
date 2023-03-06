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
		},
		
		logo : {
			type : DataTypes.STRING,
			allowNull : false,
			defaultValue : '/images/league/default.png',
		},
	})
}
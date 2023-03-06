const {DataTypes} = require('sequelize')

// ticket modele
module.exports = (sequelize) => {
	sequelize.define('bleacher', {
		type : {
			type : DataTypes.STRING,
			allowNull : false,
			unique : true,
			primaryKey : true,
		},
	
		price : {
			type : DataTypes.FLOAT,
			allowNull : false,
			defaultValue : 0,
		},
		
		quantity : {
			type : DataTypes.INTEGER,
			allowNull : false,
			defaultValue : 0,
		},
	})
}
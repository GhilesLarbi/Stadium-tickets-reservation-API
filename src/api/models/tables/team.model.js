const {DataTypes} = require('sequelize')

// match moedel
module.exports = (sequelize) => {
	sequelize.define('team', {
		id : {
			// type : DataTypes.UUID,
			type : DataTypes.INTEGER,
			autoIncrement : true,
			allowNull : false,
			primaryKey : true,
			// defaultValue : DataTypes.UUIDV4,
			unique : true,
		},
	
		name : {
			type : DataTypes.STRING,
			allowNull : false,
			unique : true,
			validate : {
				notEmpty : true,
			},
		},
		
		logo : {
			type : DataTypes.STRING,
			allowNull : false,
			defaultValue : '/images/team/default.png',
		},
		
		captainName : {
			type : DataTypes.STRING,
		},
	})
}

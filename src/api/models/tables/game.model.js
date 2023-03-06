const {DataTypes} = require('sequelize')
// match moedel
module.exports = (sequelize) => {
	sequelize.define('game', {
		id : {
			// type : DataTypes.UUID,
			type : DataTypes.INTEGER,
			autoIncrement : true,
			allowNull : false,
			primaryKey : true,
			// defaultValue : DataTypes.UUIDV4,
			unique : true,
		},
	
		date : {
			type : DataTypes.DATE,
			defaultValue : DataTypes.NOW,
		},
		
		isOver : {
			type : DataTypes.BOOLEAN,
			allowNull : false,
			defaultValue : false,
		},
		
		isLive : {
			type : DataTypes.BOOLEAN,
			allowNull : false,
			defaultValue : false,
		},
		
		description : {
			type : DataTypes.STRING,
		},
		
		
		leagueId : {
			type : DataTypes.INTEGER,
			defaultValue : 1,
			references: {
				model: "league",
				key: "id"
			}
		},
		
		score : {
			type : DataTypes.STRING,
		},
		
	})
}
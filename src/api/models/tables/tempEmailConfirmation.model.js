const {DataTypes} = require('sequelize')

// ticket modele
module.exports = (sequelize) => {
	sequelize.define('tempEmailConfirmation', {
		user : {
			type : DataTypes.INTEGER,
			allowNull : false,
			unique : true,
			primaryKey : true,
			references : {
				model : sequelize.models.user,
				key : 'id',
			},
		},
		
		code : {
			type : DataTypes.INTEGER,
		},
	})
}
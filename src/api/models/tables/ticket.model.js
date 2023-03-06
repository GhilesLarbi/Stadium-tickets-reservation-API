const {DataTypes} = require('sequelize')

// ticket modele
module.exports = (sequelize) => {
	sequelize.define('ticket', {
		
		// ticket have an id but it's not 
		// a primary key
		id : {
			type : DataTypes.INTEGER,
			allowNull : false,
			autoIncrement : true,
			unique : true,
		},
		
		userId : {
			type : DataTypes.INTEGER,
			allowNull : false,
			primaryKey : true,
			references: {
				model: "user",
				key: "id"
			},
			
			validate : {
				async noMoreFiveTicketsPerUser() {
					const count = await sequelize.models.ticket.findOne({
						attributes : [
							[sequelize.fn('COUNT', sequelize.col('userId')), 'count'],
						],
						
						where : {
							userId : this.userId,
						},
						raw : true,
					})
					
					if (count.count == 5) throw new Error('You reached the tickets per user limit')
				}
			},
		},
		
		gameId : {
			type : DataTypes.INTEGER,
			allowNull : false,
			primaryKey : true,
			references: {
				model: "game",
				key: "id"
			},
		},
		
		
		
		seatId : {
			type : DataTypes.INTEGER,
			allowNull : false,
			primaryKey : true,
			references: {
				model: "seat",
				key: "id"
			},
		},
		
		
		createdAt : {
			type : DataTypes.DATE,
			allowNull : false,
			defaultValue : DataTypes.NOW,
		},
	})
}
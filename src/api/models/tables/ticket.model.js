const { DataTypes } = require('sequelize')
const AppErr = require('../../../utils/AppErr')

// ticket modele
module.exports = (sequelize) => {
	sequelize.define('ticket', {

		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			unique: true,
		},

		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "user",
				key: "id"
			},

			validate: {
				async noMoreFiveTicketsPerUser() {
					const allTickets = await sequelize.models.ticket.findAll({
						include: [sequelize.models.game],
						where: {
							userId: this.userId,
						},

						raw: true,
					})

					let count = 0
					allTickets.forEach(ticket => {
						if (new Date(ticket["game.date"]).getTime() > new Date().getTime()) count = count + 1
					});

					if (count >= 5) throw new Error('You reached the tickets per user limit')
				}
			},
		},

		gameId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "game",
				key: "id"
			},

			validate: {
				async isValidGameDate() {
					const game = await sequelize.models.game.findOne({
						where: {
							id: this.gameId,
						},

						raw: true,
					})

					if (game.date.getTime() < (new Date()).getTime()) throw new Error('This game is Over')
				},
			},
		},



		bleacherType: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: "bleacher",
				key: "type"
			},
		},


		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},

	}, {
		// add validator here
		validate: {
			async noMorePlaces() {

				const countTickets = await sequelize.models.ticket.findOne({
					attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
					where: {
						bleacherType: this.bleacherType,
						gameId: this.gameId,
					},
					raw: true,
				})

				const bleacher = await sequelize.models.bleacher.findOne({
					where: {
						type: this.bleacherType,
					},
					raw: true,
				})

				if (!bleacher) throw new AppErr(404, 'no bleacher of type ' + this.bleacherType + ' found', 'bleacherType')

				if (countTickets.count >= bleacher.quantity)
					throw new AppErr(401, 'all places of bleacher ' + this.bleacherType + ' are taken', 'bleacherType')
			}
		},
	})
}

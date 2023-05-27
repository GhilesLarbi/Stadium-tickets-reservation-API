const { DataTypes } = require('sequelize')
// match moedel
module.exports = (sequelize) => {
	sequelize.define('game', {
		id: {
			// type : DataTypes.UUID,
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
			// defaultValue : DataTypes.UUIDV4,
			unique: true,
		},

		date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},

    isFinished : {
      type: DataTypes.VIRTUAL,
      get() {
        if (new Date() < new Date(this.date)) return false
        else return true
      },
      set(value) {
        throw new Error('Do not try to set the `isFinished` value!');
      }
    },

		description: {
			type: DataTypes.STRING,
		},


		leagueId: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
			references: {
				model: "league",
				key: "id"
			}
		},

		score: {
			type: DataTypes.STRING,
      validate : {
        is: {
          args : /[0-9]+-([0-9])+/g,
          msg : "The score format is incorrect"
        },
      },
		},

	}, {
		defaultScope: {
			order: [['date', 'ASC']]
		}
	})
}

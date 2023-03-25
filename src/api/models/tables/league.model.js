const {
	DataTypes
} = require('sequelize')

// ticket modele
module.exports = (sequelize) => {
	sequelize.define('league', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
			autoIncrement: true,
			primaryKey: true,
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,

			set(value) {
				this.setDataValue('name', value.toUpperCase())
			},

			validate: {
				notEmpty: {
					msg: 'League name cannot be empty',
				},

				notNull: {
					msg: 'League name cannot be null',
				},
			},
		},

		logo: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'default.png',

			get() {
				return process.env.API_URL + '/images/league/' + this.getDataValue("logo")
			}
		},

	})
}
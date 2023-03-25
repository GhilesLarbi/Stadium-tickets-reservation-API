const {
	DataTypes
} = require('sequelize')

// match moedel
module.exports = (sequelize) => {
	sequelize.define('team', {
		id: {
			// type : DataTypes.UUID,
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
			// defaultValue : DataTypes.UUIDV4,
			unique: true,
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
					msg: 'Team name cannot be empty',
				},

				notNull: {
					msg: 'Team name cannot be null',
				},
			},
		},

		logo: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'default.png',
			get() {
				return process.env.API_URL + '/images/team/' + this.getDataValue('logo')
			}
		},

		captainName: {
			type: DataTypes.STRING,
		},
	})
}
const { DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
// user moedel
module.exports = (sequelize) => {
	sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			unique: true,
		},

		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args : [5,1000],
					msg : "Please choose a name that has more than 5 characters"
				} ,
				notEmpty: {
					msg: 'User name cannot be empty',
				},

				notNull: {
					msg: 'User name cannot be null',
				},
			},
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(value) {
				this.setDataValue('password', bcrypt.hashSync(value, 10))
			},

			validate: {
				len: {
					args : [7,1000],
					msg : "Please choose a strnog password that has more than 7 characters",
				},

				notEmpty: {
					msg: 'Password cannot be empty',
				},

				notNull: {
					msg: 'Password cannot be null',
				},
			},
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,

			set(value) {
				this.setDataValue('email', value.toLowerCase())
			},

			validate: {
				isEmail: {
					msg: "Doesn't look like an email",
				},
				notEmpty: {
					msg: 'Email cannot be empty',
				},

				notNull: {
					msg: 'Email cannot be null',
				},
			},
		},

		isEmailConfirmed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},

		phone: {
			type: DataTypes.STRING,
			unique : true,
			allowNull : true,
			validate: {
				is : {
					args : /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
					msg : "Doesn't look like an algerian phone number",
				},
				isNumeric: {
					msg: "Doesn't look like a phone number",
				},
			},
		},

		nationalNumber: {
			type: DataTypes.STRING,
			unique : true,
			allowNull : true,
			validate: {
				len: {
					args : [10,18],
					msg : "Doesn't looke like a valid national number"
				} ,
				isNumeric: {
					msg: "Doesn't look like a valid national number",
				},
			},
		},
	}, {
		defaultScope: {
			attributes: {
				exclude: ['password'],
			},
		},

		scopes: {
			login(email) {
				return {
					attributes: ['password', 'email', 'id'],
					where: {
						email: email,
					},
					raw: true,
				}
			},
		},
	})
}

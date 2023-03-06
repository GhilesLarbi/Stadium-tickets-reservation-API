const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')
// user moedel
module.exports = (sequelize) => {
	sequelize.define('user', {
		id : {
			type : DataTypes.INTEGER,
			allowNull : false,
			primaryKey : true,
			autoIncrement : true,
			// defaultValue : DataTypes.UUIDV4,
			unique : true,
		},
	
		username : {
			type : DataTypes.STRING,
			allowNull : false,
			defaultValue : 'user',
			unique : true,
			validate : {
				notEmpty : {
					msg : 'User name cannot be empty',
				},
				
				notNull : {
					msg : 'User name cannot be null',
				},
			},
		},
	
		firstname : {
			type : DataTypes.STRING,
			allowNull : false,
			validate : {
				notEmpty : {
					msg : 'First name cannot be empty',
				},
				
				notNull : {
					msg : 'First name cannot be null',
				},
			},
		},
	
		lastname : {
			type : DataTypes.STRING,
			allowNull : false,
			notEmpty : {
					msg : 'Last name cannot be empty',
				},
				
				notNull : {
					msg : 'Last name cannot be null',
				},
		},
	
		password : {
			type : DataTypes.STRING,
			allowNull : false,
			validate : {
				notEmpty : {
					msg : 'Password cannot be empty',
				},
				
				notNull : {
					msg : 'Password cannot be null',
				},
			},
		},
	
		email : {
			type : DataTypes.STRING,
			allowNull : false,
			unique : true,
			validate: {
				isEmail: {
					msg : "Doesn't look like an email",
				},
				notEmpty : {
					msg : 'Email cannot be empty',
				},
				
				notNull : {
					msg : 'Email cannot be null',
				},
			},
		},
		
		isEmailConfirmed : {
			type : DataTypes.BOOLEAN,
			allowNull : false,
			defaultValue : false,
		},
		
		phone : {
			type : DataTypes.STRING,
			allowNull : false,
			unique : true,
			validate: {
				isNumeric : {
					msg : "Doesn't look like a phone number",
				},
				
				notEmpty : {
					msg : 'Phone number cannot be empty',
				},
				
				notNull : {
					msg : 'Phone number cannot be null',
				},
			},
		},
		
		nationalNumber :{
			type : DataTypes.STRING,
			allowNull : false,
			unique : true,
			validate: {
				isNumeric : {
					msg : "Doesn't look like a national number",
				},
				notEmpty : {
					msg : 'National number cannot be empty',
				},
				
				notNull : {
					msg : 'National number cannot be null',
				},
			},
		},
	}, {
		hooks : {
			beforeCreate : (user, options) => {
				user.password = bcrypt.hashSync(user.password, 10)
			},
		},
	})
}

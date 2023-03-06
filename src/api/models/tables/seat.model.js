const {DataTypes} = require('sequelize')

// ticket modele
module.exports = (sequelize) => {
	sequelize.define('seat', {
		id : {
			type : DataTypes.INTEGER,
			allowNull : false,
			autoIncrement : true,
			unique : true,
			primaryKey : true,
		},
		
		code : {
			type : DataTypes.STRING,
			allowNull : false,
			primaryKey : true,
		},
		
		bleacherType : {
			type : DataTypes.STRING,
			allowNull : false,
			primaryKey : true,
			references: {
				model: "bleacher",
				key: "type"
			},
		}
	}, {
		validate : {
			async uniqueCodeBleacherType() {
				const same = await sequelize.models.seat.findOne({
					where : {
						code : this.code,
						bleacherType : this.bleacherType,
					},
				})
				
				if (same) throw new Error('There is allready a seat with code ' +
				this.code + 'and a bleacher type ' + this.bleacherType)
			}
		},
	})
}
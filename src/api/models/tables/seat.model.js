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
					raw : true,
				})
				
				if (same) throw new Error('There is allready a seat with code ' +
				this.code + 'and of bleacher ' + this.bleacherType)
			},
			
			async limitSeats() {
				const count = (await sequelize.models.seat.findOne({
					attributes : [
						[sequelize.fn('COUNT', sequelize.col('id')), 'count'],
					],
					
					where : {
						bleacherType : this.bleacherType,
					},
					
					raw : true,
				})).count
				
				const limit = (await sequelize.models.bleacher.findOne({
					where : {
						type : this.bleacherType,
					},
					raw : true,
				})).quantity
				
				if (count >= limit) throw new Error('Reached seats limit of '+this.bleacherType+' type')
			},
		},
	})
}
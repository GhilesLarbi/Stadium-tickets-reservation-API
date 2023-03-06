function applyExtraSetup(sequelize) {
	const { user, ticket, game, seat, bleacher, team, league, tempEmailConfirmation} = sequelize.models;
	
	// *****************
	// user associations
	user.hasMany(ticket, {
		onDelete : 'CASCADE',
		onUpdate : 'CASCADE',
		foreignKey : 'userId',
	})
	
	// *******************
	// ticket associations
	ticket.belongsTo(user, {
		onDelete : 'CASCADE',
		onUpdate : 'CASCADE',
		forignKey : 'userId',
	})
	
	
	ticket.belongsTo(game, {
		onDelete : 'CASCADE',
		onUpdate : 'CASCADE',
		foreignKey : 'gameId',
	})
	
	ticket.belongsTo(seat, {
		onDelete : 'CASCADE',
		onUpdate : 'CASCADE',
		foreignKey : 'seatId',
	})
	
	// *****************
	// seat associations
	seat.belongsTo(bleacher, {
		onDelete : 'CASCADE',
		onUpdate : 'CASCADE',
		foreignKey: 'bleacherType',
	})
	
	seat.hasMany(ticket, {
		onDelete : 'CASCADE',
		onUpdate : 'CASCADE',
		foreignKey : 'seatId',
	})
	
	seat.belongsToMany(game, {
		through : ticket,
	})
	
	
	// *********************
	// bleacher associations
	bleacher.hasMany(seat, {
		onDelete : 'CASCADE',
		onUpdate : 'CASCADE',
		foreignKey: 'bleacherType',
	})
	
	
	// *****************
	// game associations
	game.hasMany(ticket, {
		onDelete : 'CASCADE',
		onUpdate : 'CASCADE',
	})
	
	game.belongsToMany(seat, {
		through : ticket,
	})
	
	game.belongsTo(league, {
		onDelete : 'SET NULL',
		onUpdate : 'CASCADE',
		foreignKey : 'leagueId',
	})
	
	game.belongsTo(team, {
		onDelete : 'SET NULL',
		onUpdate : 'CASCADE',
		foreignKey : 'team1Id',
		as : 'team1',
	})
	
	game.belongsTo(team, {
		onDelete : 'SET NULL',
		onUpdate : 'CASCADE',
		foreignKey : 'team2Id',
		as : 'team2',
	})
	
	
	// *******************
	// team associations
	team.hasMany(game, {
		onDelete : 'SET NULL',
		onUpdate : 'CASCADE',
		foreignKey : 'team1Id',
		as : 'team1',
	})
	
	team.hasMany(game, {
		onDelete : 'SET NULL',
		onUpdate : 'CASCADE',
		foreignKey : 'team2Id',
		as : 'team2',
	})
	
	
	// *******************
	// league associations
	league.hasMany(game, {
		onDelete : 'SET NULL',
		onUpdate : 'CASCADE',
		foreignKey : 'leagueId',
	})
}

module.exports = { applyExtraSetup };

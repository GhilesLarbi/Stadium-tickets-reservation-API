function applyExtraSetup(sequelize) {
	const { user, ticket, game, bleacher, team, league} = sequelize.models;
	
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
	
	ticket.belongsTo(bleacher, {
		onDelete : 'CASCADE',
		onUpdate : 'CASCADE',
		foreignKey : 'bleacherType',
	})
	
	
	// *********************
	// bleacher associations
	bleacher.hasMany(ticket, {
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

const sequelize = require('../api/models')
const { Op } = require('sequelize');
const db = sequelize.models

const associations = {
	user : ['ticket'],
	ticket : ['user', 'game', 'bleacher'],
	bleacher : ['ticket'],
	game : ['league', 'ticket'],
	league : ['game'],
	team : [],
}

const countPks = {
	user : 'id',
	ticket : 'id',
	bleacher : 'type',
	game : 'id',
	team : 'id',
	league : 'id',
}

/*
const filtetBy = {
	user : 
}
*/

const compareQuery = (query) => {
	// find first number
	let firstNumIndex = -1
	for (let i = 0; i < query.length; i++) {
		if (parseInt(query[i])) {
			firstNumIndex = i 
			break
		}
	}
	
	if (firstNumIndex < 2) return null
	
	const operation = query.slice(0,firstNumIndex)
	
	const num = parseInt(query.slice(firstNumIndex))
	if (!num) return null
		
	if (operation == 'gt') return { [Op.gt] : num}
	else if (operation == 'gte') return { [Op.gte] : num }
	else if (operation == 'lt') return { [Op.lt] : num }
	else if (operation == 'lte') return { [Op.lte] : num }
	else if (operation == 'eq') return { [Op.eq] : num }
		
	return null
}

function queryHandler(model) {
	return (req, res, next) => {
		let option = {
			attributes : {},
			include : [],
			where : {},
			limit : null,
			offset : null,
		}
		
		// filter by
		if (model == 'user') {
			// exclude user password
			option.attributes.exclude = ['password']
			// is email confirmed
			if (req.query.isEmailConfirmed in ['0', '1'])
				option.where.isEmailConfirmed = (req.query.isEmailConfirmed == '1') ? true : false
		
			// email
			if (req.query.email)
				option.where.email = {[Op.substring]: req.query.email}
		
			// user id 
			if (parseInt(req.query.id))
				option.where.id = req.query.id 
				
		} else if (model == 'ticket') {
			// search by game ID
			if (parseInt(req.query.gameId) >= 0)
				option.where.gameId = req.query.gameId
	
	
			if (parseInt(req.query.userId) >= 0)
				option.where.userId = req.query.userId
		
			if (!req.isAdmin) 
				option.where.userId = req.id 
				
		} else if (model == 'team') {
			// name
			if (req.query.name)
				option.where.name =  {[Op.substring]: req.query.name}
			
			// id
			if (parseInt(req.query.id))
				option.where.id = req.query.id
			
			// captain name
			if (req.query.captainName)
				option.where.captainName =  {[Op.substring]: req.query.captainName}
		
		} else if (model == 'league') {
			// name
			if (req.query.name)
				option.where.name =  {[Op.substring]: req.query.name}
			
			// id
			if (parseInt(req.query.id))
				option.where.id = req.query.id
	
		} else if (model == 'game') {
			if (parseInt(req.query.id) >= 0) 
				option.where = {id : req.query.id}
		
		} else if (model == 'bleacher') {
	
			// type query
			if (req.query.type)
				option.where.type =  {[Op.substring]: req.query.type}
			
			// quantity query
			if (req.query.quantity) {
				const quantity = compareQuery(req.query.quantity)
				if (quantity) option.where.quantity = compareQuery(req.query.quantity)
			}
			
			// price query
			if (req.query.price) {
				const price = compareQuery(req.query.price)
				if (price) option.where.price = compareQuery(req.query.price)
			}
		}
	
		// split include query
		let queryInclude = []
		if (req.query.include)
			queryInclude = req.query.include.split(',')
		
		
		// add includes
		if (queryInclude.length != 0 && associations[model]) {
			// to include 
			const includeStrings = queryInclude.filter(value => associations[model].includes(value))
			
			for (let i = 0; i < includeStrings.length; i++) {
				option.include.push(db[includeStrings[i]])
			}
			
			// special includes 
			// include teams in game
			if (model == 'game' && queryInclude.includes('team')) {
				option.include.push({
					model : db.team,
					as : 'team1',
				})
				
				option.include.push({
					model : db.team,
					as : 'team2',
				})
			}
			
			// include games in team
			if (model == 'team' && queryInclude.includes('game')){
				option.include.push({
					model : db.game,
					as : 'team1',
				})
				
				option.include.push({
					model : db.game,
					as : 'team2',
				})
			}
		}
		
		req.count = false
		
		// check pagination queries
		let page = parseInt(req.query.page) || 1
		page = (page > 0)? page : 1
			
		let limit = parseInt(req.query.limit) || 20
		limit = (limit > 0) ? limit : 20
		
		option.limit = limit
		option.offset = (page - 1) * limit
		
		// if count present then no need for pagination
		if (req.query.count) {
			req.count = true 
			delete option.include 
			delete option.limit
			delete option.offset
			option.attributes = [[sequelize.fn('COUNT', sequelize.col(countPks[model])), 'count']]
		}
		
		req.option = option
		return next()
	}
}

module.exports = queryHandler
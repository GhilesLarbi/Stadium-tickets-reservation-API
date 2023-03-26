const sequelize = require('../api/models')
const { Op } = require('sequelize');
const db = sequelize.models

const associations = {
	user : ['ticket'],
	ticket : ['user', 'game', 'bleacher'],
	bleacher : [],
	game : ['league', 'ticket', {'team' : 'team1'}, {'team' : 'team2'}],
	league : ['game'],
	team : [{'game' : 'team1'}, {'game' : 'team2'}],
}

const primaryKeys = {
	user : 'id',
	ticket : 'id',
	bleacher : 'type',
	game : 'id',
	team : 'id',
	league : 'id',
}

const findBy = {
	user : {
		isEmailConfirmed : "bool",
		email : "string",
		id : "integer",
	},
	
	ticket : {
		gameId : "integer",
		userId : "integer" ,
	},
	
	game : {
		id : "integer",
	},
	
	bleacher : {
		type : "string",
		quantity : "compare",
		price : "compare",
	},
	
	team : {
		name : "string" ,
		id : "integer" ,
		captainName : "string",
	},
	
	league : {
		name : "string",
		id : "integer",
	}
}

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
		Object.entries(findBy[model]).forEach(([query, type], index) => { 
			if (type == "integer") {
				if (req.query[query])
					option.where[query] = req.query[query]
			}
			else if (type == "string") {
				if (req.query[query]) 
					option.where[query] = {[Op.substring]: req.query[query]}
			}
			else if (type == "bool") {
				const value = (req.query[query] in ['0', '1'])? req.query[query] : null
				if (value)
					option.where[query] = (value == '1') ? true : false
			}
			else if (type == "compare") {
				if (req.query[query]) {
					const value = compareQuery(req.query[query])
					if (value) option.where[query] = value
				}
			}
		})
		
		// special
		if (model == 'user') {
			if (!req.isAdmin) option.where = {id : req.id}
		} else if (model == 'ticket') {
			if (!req.isAdmin) option.where.userId = req.id 
		}
	
	
		// split include query
		let queryInclude = []
		if (req.query.include)
			queryInclude = req.query.include.split(',')
		
		// add includes
		if (queryInclude.length != 0 && associations[model]) {
			associations[model].forEach(association => {
				queryInclude.forEach(query => {
					if (association == query) {
						option.include.push(db[query])
					} else if (typeof association == "object" && association[query]) {
						option.include.push({
							model : db[query],
							as : association[query]
						})
					}
				})
			})
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
			option.attributes = [[sequelize.fn('COUNT', sequelize.col(primaryKeys[model])), 'count']]
		}
		
		req.option = option
		return next()
	}
}

module.exports = queryHandler
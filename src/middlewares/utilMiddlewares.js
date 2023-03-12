function paginationHandler(req, res, next) {
	// split include query
	if (req.query.include) 
		req.include = req.query.include.split(',')
	else req.include = []
	
	
	// if count present then no need for pagination
	if (req.query.count) {
		// no need for includes
		req.include = []
		req.count = true
		return next()
	}
	
	
	req.count = false
	
	// check pagination queries
	let page = parseInt(req.query.page) || 1
	page = (page > 0)? page : 1
		
	let limit = parseInt(req.query.limit) || 20
	limit = (limit > 0) ? limit : 20
		
	req.limit = limit
	req.offset = (page - 1) * limit
	
	return next()
}

module.exports = { 
	paginationHandler,
}

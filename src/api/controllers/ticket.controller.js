const sequelize = require('../models')
const db = sequelize.models

const path = require('path')
const QRCode = require('qrcode');

const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')

const crypto = require('../../utils/crypto')

const buildPDF = require('../../utils/generateTicket')

//@desc get tickets
//@route GET /api/ticket
//@access user 
const getTickets = asyncHandler(async (req, res) => {
	let result
	
	let option = {
		attributes : {exclude : ['password']},
		where : {},
		limit : req.limit,
		offset : req.offset,
		include : [],
	}
	
	// include seat
	if (req.include.includes('bleacher')) option.include.push('bleacher')
	
	// include game
	if (req.include.includes('game')) option.include.push('game')
	
	// include user
	if (req.include.includes('user')) option.include.push('user')
	
	
	// search by game ID
	
	if (parseInt(req.query.gameId) >= 0)
		option.where.gameId = req.query.gameId
	
	
	if (parseInt(req.query.userId) >= 0)
		option.where.userId = req.query.userId
		
	if (!req.isAdmin) 
		option.where.userId = req.id
	
	// if count query is present
	if (req.count) {
		option.attributes = [[sequelize.fn('COUNT', sequelize.col('id')), 'count']]
		result = await db.ticket.findOne(option)
	} else {
		result = await db.ticket.findAll(option)
	}
	
	res.send(AppRes(200, 'data fetched', result))
})


//@desc create ticket
//@route POST /api/ticket
//@access user 
const createTicket = asyncHandler(async (req, res) => {
	
	const game = await db.game.findByPk(req.body.gameId)
	if (!game) throw new AppErr(404, 'No game with id of ' + req.body.gameId, 'gameId')
	
	const bleacher = await db.bleacher.findByPk(req.body.bleacherType)
	if (!bleacher) throw new AppErr(404, 'No bleacher with type of ' + req.body.bleacherType, 'bleacherType')
	
	
	// integrate stripe here
	
	// create Ticket
	const ticket = await db.ticket.create({
		userId : req.id,
		gameId : req.body.gameId,
		bleacherType : req.body.bleacherType,
	})
	
	res.status(201).send(AppRes(201, 'ticket created', ticket))
})


//@desc generate QR code
//@route GET /api/ticket/:id/qrcode
//@access user 
const generatePDF = asyncHandler(async (req, res) => {
	
	// get ticket
	const ticket = await db.ticket.findOne({
		include : [
			db.user,
			db.bleacher,
			{
				model : db.game,
				include: [
					db.league,
					{
						model: db.team,
						as: 'team1',
					},
			
					{
						model: db.team,
						as: 'team2',
					},
				],
			},
		],
		where : {
			id : req.params.id,
			userId : req.id,
		},
	})
	
	// if no ticket found exit
	if (!ticket) throw new AppErr(404, 'No ticket with id of '+req.params.id, 'ticketId')
	
	
	// encrypt  "userId ticketId" : "1 5"
	const qrcodestr = crypto.encrypt(ticket.userId.toString() + ' ' + ticket.id.toString())
	
	// decrypt
	// console.log(crypto.decrypt(qrcodestr))
	
	// generate Qr Code image
	const qrcodeImage = await QRCode.toDataURL(qrcodestr, {
		errorCorrectionLevel: 'H',
			color : {
				dark : '#222222ff' ,
				light : '#ffffff00',
			},
	})
    
	// stream the PDF
	const stream = res.writeHead(200, {
		'Content-Type' : 'application/pdf',
		'Contenet-Disposition' : 'attachment;filname=ticket.pdf',
	})
	
	
	buildPDF(
		(chunk) => stream.write(chunk),
		() => stream.end(),
		{
			qrcodestr,
			qrcodeImage,
			ticket : ticket.toJSON(),
		},
	)
})


//@desc delete ticket
//@route DELETE /api/ticket/:id
//@access user 
const deleteTicket = asyncHandler(async (req, res) => {
	const option = {where : {id : req.params.id}}
	if (!req.isAdmin) option.where.userId = req.id
	
	let result = await db.ticket.findOne(option)
	
	if (!result) throw new AppErr(404, 'Didn\'t find any ticket with id of ' + req.params.id, 'ticketId')
	
	result.destroy()
	
	res.send(AppRes(200, 'ticket deleted', result))
	
})

module.exports = {
	getTickets,
	createTicket,
	generatePDF,
	deleteTicket,
}
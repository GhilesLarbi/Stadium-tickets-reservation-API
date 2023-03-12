const sequelize = require('../models')
const db = sequelize.models
const ticketModel = sequelize.models.ticket 

const path = require('path')
const QRCode = require('qrcode');

const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')

const {findFreeSeat} = require('../../utils/modelUtils')
const crypto = require('../../utils/crypto')


//@desc get tickets
//@route GET /api/ticket
//@access user 
const getTickets = asyncHandler(async (req, res) => {
	// read queries
	let includeQuery = req.query.include || ''
	includeQuery = includeQuery.split(',')
	
	let options = {where : {userId : req.id}, include : []}
	
	// include seat
	if (includeQuery.includes('seat')) options.include.push('seat')
	
	// include game
	if (includeQuery.includes('game')) options.include.push('game')
	
	
	// get data
	const result = await ticketModel.findAll(options)
	
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
	
	
	
	// find free seat
	const seat = await findFreeSeat(req.body.gameId, req.body.bleacherType)
	
	if (!seat) throw new AppErr(404, 'All seats of type '+req.body.bleacherType+' are taken', 'bleacherType')
	
	
	// integrate stripe here
	
	// create Ticket
	const ticket = await ticketModel.create({
		userId : req.id,
		gameId : req.body.gameId,
		seatId : seat,
	})
	
	res.status(201).send(AppRes(201, 'ticket created', ticket))
})


//@desc generate QR code
//@route GET /api/ticket/:id/qrcode
//@access user 
const generateQrCode = asyncHandler(async (req, res) => {
	
	// get ticket
	const ticket = await ticketModel.findOne({
		where : {
			id : req.params.id,
			userId : req.id,
		},
		
		raw : true,
	})
	
	// if no ticket found exit
	if (!ticket) throw new AppErr(404, 'No ticket with id of '+req.params.id, 'ticketId')
	
	
	// encrypt  "userId ticketId" : "1 5"
	const qrcodestr = crypto.encrypt(ticket.userId.toString() + ' ' + ticket.id.toString())
	
	// decrypt
	// console.log(crypto.decrypt(qrcodestr))
	
	
	// generate Qr Code image
	const qr = await QRCode.toFile(
		'src/images/tempQrCode/qr.png',
		[{data: qrcodestr, mode: 'byte'}],
		{
			// control the resistance against dust here
			// L : low (7%)
			// M : Medium (15%)
			// Q : Quartile (25%)
			// H : High (30%)
			errorCorrectionLevel: 'H',
		}
	)
	
	// SKETCHY-CODE
	res.status(201).sendFile(path.join(__dirname + '/../../images/tempQrCode/qr.png'))
})


//@desc delete ticket
//@route DELETE /api/ticket/:id
//@access user 
const deleteTicket = asyncHandler(async (req, res) => {
	let result = await ticketModel.findOne({
		where : {
			id : req.params.id,
			userId : req.id,
		},
	})
	
	if (!result) throw new AppErr(404, 'Didn\'t find any ticket with id of ' + req.params.id, 'ticketId')
	
	result.destroy()
	
	res.send(AppRes(200, 'ticket deleted', result))
	
})

module.exports = {
	getTickets,
	createTicket,
	generateQrCode,
	deleteTicket,
}
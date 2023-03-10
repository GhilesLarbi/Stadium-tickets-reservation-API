const sequelize = require('../models')
const ticketModel = sequelize.models.ticket 

const path = require('path')
const QRCode = require('qrcode');

const asyncHandler = require('../../utils/asyncErrorHandler')
const responseTemplate = require('../../utils/responseTemplate')
const findFreeSeat = require('../../utils/findFreeSeat')
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
	
	res.send(responseTemplate(true, 200, 'data fetched', result))
})


//@desc create ticket
//@route POST /api/ticket
//@access user 
const createTicket = asyncHandler(async (req, res) => {
	
	// find free seat
	const seat = await findFreeSeat(req.body.gameId, req.body.bleacherType)
	
	if (!seat) throw new Error('All seats of type '+req.body.bleacherType+' are taken')
	
	
	// integrate stripe here
	
	// create Ticket
	const ticket = await ticketModel.create({
		userId : req.id,
		gameId : req.body.gameId,
		seatId : seat,
	})
	
	res.send(responseTemplate(true, 200, 'ticket created', ticket))
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
	if (!ticket) throw new Error('No ticket with id of '+req.params.id)
	
	
	// encrypt  "userId ticketId" : "1 5"
	const qrcodestr = crypto.encrypt(ticket.userId.toString() + ' ' + ticket.id.toString())
	
	// decrypt
	// console.log(crypto.decrypt(qrcodestr))
	
	
	// generate Qr Code image
	const qr = await QRCode.toFile(
		'src/images/tempQrCode/qr.png',
		qrcodestr,
		{
			errorCorrectionLevel: 'H',
		}
	)
	
	// SKETCHY-CODE
	res.sendFile(path.join(__dirname + '/../../images/tempQrCode/qr.png'))
})


//@desc delete ticket
//@route DELETE /api/ticket/:id
//@access user 
const deleteTicket = asyncHandler(async (req, res) => {
	const result = await ticketModel.destroy({
		where : {
			id : req.params.id,
			userId : req.id,
		},
	})
	
	res.send(responseTemplate(true, 200, 'ticket deleted', {infected : result}))
	
})

module.exports = {
	getTickets,
	createTicket,
	generateQrCode,
	deleteTicket,
}
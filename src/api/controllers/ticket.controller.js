const sequelize = require('../models')
const db = sequelize.models
const path = require('path')
const QRCode = require('qrcode');
const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')
const crypto = require('../../utils/crypto')
const buildPDF = require('../../utils/generateTicket')
const jwt = require('jsonwebtoken')
const stripe = require("stripe")(process.env.STRIPE_TOKEN)

//@route GET /ticket
//@middlewares authenticate => role(admin/valid-user)
const getTickets = asyncHandler(async (req, res) => {
	let result
	let option = req.option

	if (!req.isAdmin)
		option.where.userId = req.id

	// if count query is present
	if (req.count) {
		result = await db.ticket.findOne(option)
	} else {
		result = await db.ticket.findAll(option)
	}

	res.send(AppRes(200, 'data fetched', result))
})


//@route GET /ticket/:id
//@middlewares authenticate => role(admin/valid-user)
const getTicket = asyncHandler(async (req, res) => {
	let option = req.option
	option.where.id = req.params.id

	const result = await db.ticket.findOne(option)

	res.send(AppRes(200, 'data fetched', result))
})


//@route POST /ticket
//@middlewares authenticate => role(valid-user)
const buyTicket = asyncHandler(async (req, res) => {

	if (!req.body.cancelUrl || !req.body.successUrl) throw new AppErr(403, "please provide the correct data", "successUrl")

	let game = await db.game.findByPk(req.body.gameId, {
		include: [{
			model: db.team,
			association: "team1"
		},
		{
			model: db.team,
			association: "team2",
		}]
	})
	if (!game) throw new AppErr(404, 'No game with id of ' + req.body.gameId, 'gameId')
	game = game.toJSON()


	const bleacher = await db.bleacher.findByPk(req.body.bleacherType, { raw: true })
	if (!bleacher) throw new AppErr(404, 'No bleacher with type of ' + req.body.bleacherType, 'bleacherType')

	let quantity = req.body.quantity
	if (quantity && !parseInt(quantity)) quantity = 1
	quantity = parseInt(quantity)


	// check if the quantity is less then 5
	const allTickets = await db.ticket.findAll({
		include: [sequelize.models.game],
		where: {
			userId: req.id,
		},
		raw: true,
	})

	let count = 0

	allTickets.forEach(ticket => {
		if (new Date(ticket["game.date"]).getTime() > new Date().getTime()) count = count + 1
	});

	if (count + quantity > 5) throw new AppErr(403, 'You can\'t buy more than 5 tickets', "quantity")


	// generate url token
	const token = jwt.sign(
		{
			userId: req.id,
			gameId: req.body.gameId,
			bleacherType: req.body.bleacherType,
			quantity: req.body.quantity,
			successUrl: req.body.successUrl,
		},
		process.env.TOKEN_ENCRYPTION_KEY,
	)

	// integrate stripe here

	let session
	try {
		session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: `${game.team1.name} vs ${game.team2.name}`,
						},
						unit_amount: bleacher.price,
					},
					quantity: quantity
				},
			],
			success_url: `${req.protocol}://${req.get('host')}${process.env.API_URL}/ticket/create/${token}`,
			cancel_url: req.body.cancelUrl
		})
	} catch (err) {
		throw new AppErr(500, "cannot connect to stripe", "stripe")
	}

	res.send(AppRes(200, "ready to pay", { payUrl: session.url }))
})


//@route POST /ticket/create/:token
//@middlewares authenticate => role(valid-user)
const createTicket = asyncHandler(async (req, res) => {

	await jwt.verify(req.params.token, process.env.TOKEN_ENCRYPTION_KEY, async (err, data) => {
		if (err) throw new AppErr(401, 'Invalid token', 'token')

		// create Ticket
		let result = []

		for (let i = 0; i < data.quantity; i++) {
			const ticket = await db.ticket.create({
				userId: data.userId,
				gameId: data.gameId,
				bleacherType: data.bleacherType,
			})

			result.push(ticket)
		}
		// res.status(201).send(AppRes(201, 'ticket created', result))
		res.status(308).redirect(data.successUrl)
	})
})




//@route GET /ticket/:id/:type 
//@middlewares authenticate => role(admin/valid-user)
const generate = asyncHandler(async (req, res) => {
	const type = (['qrcode', 'pdf', 'string', 'base64'].includes(req.params.type)) ? req.params.type : 'qrcode'

	const where = { id: req.params.id }
	if (!req.isAdmin)
		where.userId = req.id

	// get ticket
	const ticket = await db.ticket.findOne({
		include: [
			db.user, db.bleacher,
			{
				model: db.game,
				include: [
					db.league,
					{ model: db.team, as: 'team1', },
					{ model: db.team, as: 'team2', },
				],
			},
		],
		where: where,
	})

	// if no ticket found exit
	if (!ticket) throw new AppErr(404, 'No ticket with id of ' + req.params.id, 'ticketId')


	// encrypt  "userId ticketId" : "1 5"
	const qrcodestr = crypto.encrypt(ticket.userId.toString() + ' ' + ticket.id.toString())

	if (type == "string") return res.send(AppRes(200, 'string generated', { string: qrcodestr }))

	// decrypt
	// console.log(crypto.decrypt(qrcodestr))


	if (type == "qrcode") {
		// stream the qrcode
		const stream = res.writeHead(200, {
			'Content-Type': 'image/png',
			'Contenet-Disposition': 'attachment;filname=qrcode.png',
		})
		return QRCode.toFileStream(stream, qrcodestr, {
			errorCorrectionLevel: 'H',
			color: {
				dark: '#000000ff',
				light: '#ffffffff',
			},
		})
	}


	// generate Qr Code image
	const qrcodeImage = await QRCode.toDataURL(qrcodestr, {
		errorCorrectionLevel: 'H',
		color: {
			dark: '#222222ff',
			light: '#ffffff00',
		},
	})

	if (type == "base64") return res.send(AppRes(200, 'qrcode string generated', { string: qrcodeImage }))


	// stream the PDF
	const stream = res.writeHead(200, {
		'Content-Type': 'application/pdf',
		'Contenet-Disposition': 'attachment;filname=ticket.pdf',
	})


	buildPDF(
		(chunk) => stream.write(chunk),
		() => stream.end(),
		{
			qrcodestr,
			qrcodeImage,
			ticket,
			// ticket : ticket.toJSON(),
		},
	)
})


//@route DELETE /ticket/:id
//@middlewares authenticate => role(admin/vaTypeErro
const deleteTicket = asyncHandler(async (req, res) => {
	const option = { where: { id: req.params.id } }
	if (!req.isAdmin) option.where.userId = req.id

	let result = await db.ticket.findOne(option)

	if (!result) throw new AppErr(404, 'Didn\'t find any ticket with id of ' + req.params.id, 'ticketId')

	result.destroy()

	res.send(AppRes(200, 'ticket deleted', result))
})

module.exports = {
	getTickets,
	getTicket,
	buyTicket,
	createTicket,
	generate,
	deleteTicket,
}
const PDFDocument = require('pdfkit')
const SVGtoPDF = require('svg-to-pdfkit')
const path = require('path')

function buildPDF(dataCallback, endCallback, option) {
	const doc = new PDFDocument()
	doc.on('data', dataCallback)
	doc.on('end', endCallback)
	
	// const svg = ''
	// SVGtoPDF(doc, svg, 0,0)
	
	// background color
	/*
	doc
		.save()
		.moveTo(0, 0)
		.lineTo(1000, 0)
		.lineTo(1000, 2000)
		.lineTo(0,2000)
		.fill('#fff');
	*/
	
	// tciket background
	doc.image(path.join(__dirname + '/../images/templates/ticket_template.png'), 10, 10, {
		width : 592,
	})
	
	// qr code
	doc.image(option.qrcodeImage, 23, 53, {
		width : 150,
	})
	
	// team 1 image
	doc.image(path.join(__dirname + '/../' + option.ticket.game.team1.logo), 300, 70, {
		width : 80,
	})
		.fontSize(16)
		.fillColor('#222')
		.text(option.ticket.game.team1.name, 320, 160)
	
	
	// team 2 image
	doc.image(path.join(__dirname + '/../' + option.ticket.game.team2.logo), 420, 70, {
		width : 80,
	})
		.text(option.ticket.game.team2.name, 440, 160)
	
	
	
	doc.end()
}


module.exports = buildPDF


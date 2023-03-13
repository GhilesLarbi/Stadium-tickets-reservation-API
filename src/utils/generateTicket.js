const PDFDocument = require('pdfkit')
const path = require('path')

function buildPDF(dataCallback, endCallback, option) {
	const doc = new PDFDocument()
	doc.on('data', dataCallback)
	doc.on('end', endCallback)
	
	doc
		.save()
		.moveTo(0, 0)
		.lineTo(1000, 0)
		.lineTo(1000, 2000)
		.lineTo(0,2000)
		.fill('#eee');

	doc.image(path.join(__dirname + '/../images/templates/ticket_template.png'), 10, 10, {
		width : 592,
	})

	doc.image(option.qrcodeImage, 23, 53, {
		width : 150,
	})
	
	doc.end()
}


module.exports = buildPDF


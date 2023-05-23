/**
* @api {get} /api/ticket Get tickets data
* @apiName getTickets
* @apiGroup Ticket
* @apiDescription __Access Level :__ valid-user admin <br/>
* To fetch tickets data send `GET` request to 
* `/api/ticket` endpoint :
* @apiHeader {String} Authorization Admin or Valid user Authorization token.
* @apiSuccess {Object} Data Array of tickets data
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "data fetched",
*	"data" : [
*		{
*			"id" : 1,
*			"createdAt" : "2023-07-13",
*			"bleacherType" : "VIP",
*			"gameId" : 1,
*			"userId" : 1
*		},
*		{
*			"id" : 2,
*			"createdAt" : "2023-05-24",
*			"bleacherType" : "EB",
*			"gameId" : 3,
*			"userId" : 1
*		}
*	]
* }
*/

/**
* @api {post} /api/ticket Buy ticket
* @apiName buyTicket
* @apiGroup Ticket
* @apiDescription __Access Level :__ valid-user <br/>
* To buy a ticket send `POST` request to `/api/ticket`
* endpoint, make sure to include the data needed in the request body :
* @apiBody {String} bleacherType The bleacher type
* @apiBody {Number} gameId The game Id
* @apiHeader {String} Authorization User Authorization token.
* @apiSuccess {Object} Data The new created ticket
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 201,
*	"message" : "ticket created",
*	"data" : {
*		"id" : 1,
*		"createdAt" : "2023-07-13",
*		"bleacherType" : "VIP",
*		"gameId" : 1,
*		"userId" : 1
*	}
* }
*/

/**
* @api {get} /api/ticket/:id/:type Download ticket PDF
* @apiName downloadTicketAsset
* @apiGroup Ticket
* @apiDescription __Access Level :__ valid-user <br/>
* To get the ticket asset send `GET` request to 
* `/api/ticket/:id/:type` endpoint, where `:id` is 
* the ticket unique id and `:type` is one of the following : qrcode, 
* base64, string, pdf
* @apiHeader {String} Authorization User Authorization token.
* @apiParam {Number} id Ticket unique id 
* @apiParam {String} type One of the following : qrcode, base64, string, pdf
*/

/**
* @api {delete} /api/ticket/:id Delete ticket
* @apiName deleteTicket
* @apiGroup Ticket
* @apiDescription __Access Level :__ valid-user admin <br/>
* To delete a ticket send `DELETE` request to `/api/ticket/:id`
* endpoint, where `:id` is the ticket unique id :
* @apiHeader {String} Authorization Admin or Valid User Authorization token.
* @apiParam {Number} id Ticket unique id
* @apiSuccess {Object} Data The deleted ticket data.
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "ticket deleted",
*	"data" : {
*		"id" : 1,
*		"createdAt" : "2023-09-12",
*		"bleacherType" : "VIP",
*		"gameId" : 1,
*		"userId" : 1
*	}
* }
*/
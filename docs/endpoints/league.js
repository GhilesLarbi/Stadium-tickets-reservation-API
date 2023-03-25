/**
* @api {get} /api/league Get leagues data
* @apiName getLeagues
* @apiGroup League
* @apiDescription __Access Level :__ visitor <br/>
* To fetch leagues data send `GET` request to 
* `/api/league` endpoint :
* @apiSuccess {Object} Data Array of leagues data
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "data fetched",
*	"data" : [
*		{
*			"id" : 1,
*			"name" : "LIGA",
*			"logo" : "/images/league/liga.png",
*		},
*		{
*			"id" : 2,
*			"name" : "CAN",
*			"logo" : "/images/league/can.png",
*		}
*	]
* }
*/

/**
* @api {get} /api/league/:id Get league data by id
* @apiName getLeagueById
* @apiGroup League
* @apiDescription __Access Level :__ visitor <br/>
* To fetch league data send `GET` request to 
* `/api/league/:id` endpoint, where `id` is the league unique id : 
* @apiParam {Number} id league unique id
* @apiSuccess {Object} Data league data
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "data fetched",
*	"data" : {
*		"id" : 1,
*		"name" : "LIGA",
*		"logo" : "/images/league/liga.png",
*	}
* }
*/

/**
* @api {delete} /api/league/:id Delete league by id
* @apiName deleteLeagueById
* @apiGroup League
* @apiDescription __Access Level :__ admin <br/>
* to Delete a league send `DELETE` request to `/api/league/:id`
* endpoint where `:id` is the league unique id :
* @apiHeader {String} Authorization Admin Authorization token.
* @apiParam {Number} id League unique id
* @apiSuccess {Object} Data The deleted league data.
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "league deleted",
*	"data" : {
*		"id" : 1,
*		"name" : "LIGA",
*		"logo" : "/images/league/liga.png",
*	}
* }
*/

/**
* @api {post} /api/league Create a league
* @apiName createLeague
* @apiGroup League
* @apiDescription __Access Level :__ admin <br/>
* To create a league send `POST` request to `/api/league`
* endpoint, make sure to include the data needed in the request body :
* @apiBody {String} name The league name
* @apiHeader {String} Authorization Admin Authorization token.
* @apiSuccess {Object} Data The new created league
* @apiSuccessExample Success-Response:
* HTTP/1.1 201 CREATED
* {
* 	"success" : true,
*	"code" : 201,
*	"message" : "league created",
*	"data" : {
*		"id" : 5,
*		"name" : "LIGA",
*		"logo" : "/images/league/default.png",
*	}
* }
*/

/**
* @api {put} /api/league/:id Update league
* @apiName updateLeague
* @apiGroup League
* @apiDescription __Access Level :__ admin <br/>
* To update the league data send `PUT` request to 
* `/api/league/:id` endpoint, where `:id` is the league unique id. Make sure to include the data you want to 
* modify in the request body :
* @apiParam {Number} id League unique id 
* @apiHeader {String} Authorization User Authorization token.
* @apiBody {String} [name] league name
* @apiSuccess {Object} Data The updated league data.
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "league updated",
*	"data" : {
*		"id" : 1,
*		"name" : "LIGA_1",
*		"logo" : "/images/league/liga.png",
*	}
* }
*/

/**
* @api {POST} /api/league/:id/upload/logo Upload league logo
* @apiName uploadLeagueLogo
* @apiGroup League
* @apiDescription __Access Level :__ admin <br/>
* To upload a league logo send `POST` request to `/api/league/:id/upload/logo`
* endpoint where `:id` is the league unique id, Make sure to include the logo image 
* in the request body as `FormData`:
* @apiHeader {String} Authorization Admin Authorization token.
* @apiParam {Number} id League unique id 
* @apiBody {Image} Image The logo image
* @apiSuccess {Object} Data The league data.
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "logo uploaded",
*	"data" : {
*		"id" : 1,
*		"name" : "LIGA",
*		"logo" : "/images/league/liga.png",
*	}
* }
*/


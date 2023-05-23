/**
* @api {get} /api/game Get games data
* @apiName getGames
* @apiGroup Game
* @apiDescription __Access Level :__ visitor <br/>
* To fetch games data send `GET` request to 
* `/api/game` endpoint :
* @apiSuccess {Object[]} Data Array of games data
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "data fetched",
*	"data" : [
*		{
*			"id": 1,
*			"date": "2023-11-09T00:00:00.000Z",
*			"description": "semi-final",
*			"leagueId": 1,
*			"score": null,
*			"team1Id": 1,
*			"team2Id": 2
*		},
*		{
*			"id": 2,
*			"date": "2023-01-04T00:00:00.000Z",
*			"description": "final",
*			"leagueId": 2,
*			"score": null,
*			"team1Id": 1,
*			"team2Id": 4
*		},
*	]
* }
*/


/**
* @api {get} /api/game/:id Get game data
* @apiName getGame
* @apiGroup Game
* @apiDescription __Access Level :__ visitor <br/>
* To fetch game data send `GET` request to 
* `/api/game/:id` endpoint where `:id` is the game unique id :
* @apiParam {Number} id Game unique id 
* @apiSuccess {Object} Data game data
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "data fetched",
*	"data" : {
*		"id": 1,
*		"date": "2023-11-09T00:00:00.000Z",
*		"description": "semi-final",
*		"leagueId": 1,
*		"score": null,
*		"team1Id": 1,
*		"team2Id": 2
*	}
* }
*/


/**
* @api {delete} /api/game/:id Delete game by id
* @apiName deleteGameById
* @apiGroup Game
* @apiDescription __Access Level :__ admin <br/>
* to Delete a game send `DELETE` request to `/api/game/:id`
* endpoint where `:id` is the game unique id :
* @apiHeader {String} Authorization Admin Authorization token.
* @apiParam {Number} id Game unique id
* @apiSuccess {Object} Data The deleted game data.
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "game deleted",
*	"data" : {
*		"id": 1,
*		"date": "2023-11-09T00:00:00.000Z",
*		"description": "semi-final",
*		"leagueId": 1,
*		"score": null,
*		"team1Id": 1,
*		"team2Id": 2
*	}
* }
*/

/**
* @api {post} /api/game Create a game
* @apiName createGame
* @apiGroup Game
* @apiDescription __Access Level :__ admin <br/>
* To create a game send `POST` request to `/api/game`
* endpoint, make sure to include the data needed in the request body :
* @apiBody {Date} date The game date
* @apiBody {String} description The game description 
* @apiBody {Number} leagueId league unique id 
* @apiBody {String} score The game score
* @apiBody {Number} team1Id Team 1 unique id 
* @apiBody {Number} team2Id Team 2 unique id
* @apiHeader {String} Authorization Admin Authorization token.
* @apiSuccess {Object} Data The new created league
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 201,
*	"message" : "game created",
*	"data" : {
*		"id": 1,
*		"date": "2023-11-09T00:00:00.000Z",
*		"description": "semi-final",
*		"leagueId": 1,
*		"score": null,
*		"team1Id": 1,
*		"team2Id": 2
*	}
* }
*/

/**
* @api {put} /api/game/:id Update game
* @apiName updateGame
* @apiGroup Game
* @apiDescription __Access Level :__ admin <br/>
* To update the game data send `PUT` request to 
* `/api/game/:id` endpoint, where `:id` is the game unique id. Make sure to include the data you want to 
* modify in the request body :
* @apiParam {Number} id Game unique id 
* @apiHeader {String} Authorization Admin Authorization token 
* @apiBody {Date} [date] The game date
* @apiBody {String} [description] The game description 
* @apiBody {Number} [leagueId] league unique id 
* @apiBody {String} [score] The game score
* @apiBody {Number} [team1Id] Team 1 unique id 
* @apiBody {Number} [team2Id] Team 2 unique id
* @apiSuccess {Object} Data The updated game data.
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "game updated",
*	"data" : {
*		"id": 1,
*		"date": "2023-11-09T00:00:00.000Z",
*		"description": "semi-final",
*		"leagueId": 1,
*		"score": null,
*		"team1Id": 1,
*		"team2Id": 2
*	}
* }
*/

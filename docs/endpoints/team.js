/**
* @api {get} /api/team Get teams data
* @apiName getTeams
* @apiGroup Team
* @apiDescription __Access Level :__ visitor <br/>
* To fetch teams data send `GET` request to 
* `/api/team` endpoint :
* @apiSuccess {Object} Data Array of teams data
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "data fetched",
*	"data" : [
*		{
*			"id" : 1,
*			"name" : "JSK",
*			"logo" : "/images/team/jsk-1.png",
*			"captainName" : null,
*			"captainLogo" : null
*		},
*		{
*			"id" : 2,
*			"name" : "USMA",
*			"logo" : "/images/team/usma-2.png",
*			"captainName" : null,
*			"captainLogo" : null
*		}
*	]
* }
*/

/**
* @api {get} /api/team/:id Get team data by id
* @apiName getTeamById
* @apiGroup Team
* @apiDescription __Access Level :__ visitor <br/>
* To fetch team data send `GET` request to 
* `/api/team/:id` endpoint, where `id` is the team unique id : 
* @apiParam {Number} id team unique id
* @apiSuccess {Object} Data teams data
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "data fetched",
*	"data" : {
*		"id" : 1,
*		"name" : "JSK",
*		"logo" : "/images/team/jsk-1.png",
*		"captainName" : null,
*		"captainLogo" : null
*	}
* }
*/

/**
* @api {post} /api/team Create a team
* @apiName createTeam
* @apiGroup Team
* @apiDescription __Access Level :__ admin <br/>
* To create a team send `POST` request to `/api/team`
* endpoint, make sure to include the data needed in the request body :
* @apiBody {String} name The team name
* @apiBody {String} captainName The captainName 
* @apiHeader {String} Authorization Admin Authorization token.
* @apiSuccess {Object} Data The new created team
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 201,
*	"message" : "team created",
*	"data" : {
*		"id" : 1,
*		"name" : "JSK",
*		"logo" : "/images/team/jsk-1.png",
*		"captainName" : null,
*		"captainLogo" : null
*	}
* }
*/


/**
* @api {put} /api/team/:id Update team
* @apiName updateTeam
* @apiGroup Team
* @apiDescription __Access Level :__ admin <br/>
* To update the team data send `PUT` request to 
* `/api/team/:id` endpoint, where `:id` is the team unique id. Make sure to include the data you want to 
* modify in the request body :
* @apiParam {Number} id Team unique id 
* @apiHeader {String} Authorization Admin Authorization token.
* @apiBody {String} [name] team name
* @apiBody {String} [captainName] captain name
* @apiSuccess {Object} Data The updated team data.
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "team updated",
*	"data" : {
*		"id" : 1,
*		"name" : "JSK",
*		"logo" : "/images/team/jsk-1.png",
*		"captainName" : null,
*		"captainLogo" : null
*	}
* }
*/

/**
* @api {delete} /api/team/:id Delete team by id
* @apiName deleteTeamById
* @apiGroup Team
* @apiDescription __Access Level :__ admin <br/>
* to Delete a team send `DELETE` request to `/api/team/:id`
* endpoint where `:id` is the team unique id :
* @apiHeader {String} Authorization Admin Authorization token.
* @apiParam {Number} id Team unique id
* @apiSuccess {Object} Data The deleted team data.
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "team deletdd",
*	"data" : {
*		"id" : 1,
*		"name" : "JSK",
*		"logo" : "/images/team/jsk-1.png",
*		"captainName" : null,
*		"captainLogo" : null
*	}
* }
*/

/**
* @api {POST} /api/team/:id/upload/logo Upload team logo
* @apiName uploadTeamLogo
* @apiGroup Team
* @apiDescription __Access Level :__ admin <br/>
* To upload a team logo send `POST` request to `/api/team/:id/upload/logo`
* endpoint where `:id` is the team unique id, Make sure to include the logo image 
* in the request body as `FormData`:
* @apiHeader {String} Authorization Admin Authorization token.
* @apiParam {Number} id Team unique id 
* @apiBody {Image} Image The logo image
* @apiSuccess {Object} Data The team data.
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "logo uploaded",
*	"data" : {
*		"id" : 1,
*		"name" : "JSK",
*		"logo" : "/images/team/jsk-1.png",
*		"captainName" : null,
*		"captainLogo" : null
*	}
* }
*/
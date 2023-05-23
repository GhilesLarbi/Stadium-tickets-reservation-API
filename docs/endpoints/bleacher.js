/**
* @api {get} /api/bleacher Get bleachers data
* @apiName getBleachers
* @apiGroup Bleacher
* @apiDescription __Access Level :__ visitor <br/>
* To fetch bleachers data send `GET` request to 
* `/api/bleacher` endpoint :
* @apiSuccess {Array} Data Array of bleachers data
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "data fetched",
*	"data" : [
*		{
*			"type" : "EB",
*			"price" : 300,
*			"quantity" : 8000,
*		},
*		{
*			"type" : "WT",
*			"price" : 500,
*			"quantity" : 4000,
*		},
* 		{
*			"type" : "VIP",
*			"price" : 2000,
*			"quantity" : 100,
*		}
*	]
* }
*/

/**
* @api {get} /api/bleacher/:type Get bleacher data by type
* @apiName getBleacherByType
* @apiGroup Bleacher
* @apiDescription __Access Level :__ visitor <br/>
* To fetch bleacher data send `GET` request to 
* `/api/team/:type` endpoint, where `type` is the bleacher type : 
* @apiParam {String} type bleacher type
* @apiSuccess {Object} Data bleacher data
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "data fetched",
*	"data" : {
*		"type" : "VIP",
*		"price" : 2000,
*		"quantity" : 100,
*	}
* }
*/

/**
* @api {post} /api/bleacher Create a bleacher
* @apiName createBleacher
* @apiGroup Bleacher
* @apiDescription __Access Level :__ admin <br/>
* To create a bleacher send `POST` request to `/api/bleacher`
* endpoint, make sure to include the data needed in the request body :
* @apiBody {String} type Bleacher type
* @apiBody {Number} price Bleacher price 
* @apiBody {number} quantity number of places
* @apiHeader {String} Authorization Admin Authorization token.
* @apiSuccess {Object} Data The new created bleacher
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 201,
*	"message" : "bleacher created",
*	"data" : {
*		"type" : "VIP",
*		"price" : 2000,
*		"quantity" : 100,
*	}
* }
*/

/**
* @api {put} /api/bleacher/:type Update bleacher
* @apiName updateBleacher
* @apiGroup Bleacher
* @apiDescription __Access Level :__ admin <br/>
* To update the bleacher data send `PUT` request to 
* `/api/bleacher/:type` endpoint, where `:type` is the bleacher type. Make sure to include the data you want to 
* modify in the request body :
* @apiParam {String} type Bleacher type 
* @apiHeader {String} Authorization Admin Authorization token. 
* @apiBody {String} [type] Bleacher type
* @apiBody {Number} [price] Bleacher price 
* @apiBody {number} [quantity] number of places
* @apiSuccess {Object} Data The updated bleacher data.
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "bleacher updated",
*	"data" : {
*		"type" : "VIP",
*		"price" : 4000,
*		"quantity" : 100,
*	}
* }
*/

/**
* @api {delete} /api/bleacher/:type Delete bleacher by type
* @apiName deleteBleacherByType
* @apiGroup Bleacher
* @apiDescription __Access Level :__ admin <br/>
* to delete a bleacher send `DELETE` request to `/api/bleacher/:type`
* endpoint where `:type` is the bleacher type :
* @apiHeader {String} Authorization Admin Authorization token.
* @apiParam {String} type Bleacher type
* @apiSuccess {Object} Data The deleted bleacher data.
* @apiSuccessExample Success-Response:
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "bleacher deleted",
*	"data" : {
*		"type" : "VIP",
*		"price" : 2000,
*		"quantity" : 100,
*	}
* }
*/

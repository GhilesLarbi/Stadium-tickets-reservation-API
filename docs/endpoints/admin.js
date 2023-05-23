/**
* @api {post} /api/admin/login Admin login 
* @apiName AdminLogin
* @apiGroup Admin 
* @apiDescription __Access Level :__ visitor <br/>
* To login as an admin and obtain an access token, send 
* `POST` request to `/api/admin/login` endpoint, and 
* make sure to include the right credentials in the request body :
* @apiBody {String} user Admin user name
* @apiBody {String} password Admin Password
* @apiSuccess {String} token Admin access token.
* @apiSuccessExample Success-Response:
* {
*	"success" : true,
*	"code" : 200,
*	"message" : "user loged in",
*	"data" : {
*		"token" : "ADMIN_ACCESS_TOKEN"
*	}
* }
*/
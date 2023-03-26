/**
 * @api {post} /api/user/login User login
 * @apiVersion 1.0.0
 * @apiName UserLogin
 * @apiGroup User
 *
 * @apiDescription This endpoint allows a user to log in by providing their email and password. If the provided credentials are correct, the server will return an access token which the user can use to authenticate future requests.
 *
 * @apiBody {String} email User email.
 * @apiBody {String} password User password.
 *
 * @apiSuccess {Boolean} success Whether or not the request was successful.
 * @apiSuccess {Number} code The HTTP status code returned by the server.
 * @apiSuccess {String} message A message explaining the status of the request.
 * @apiSuccess {Object} data The data returned by the endpoint.
 * @apiSuccess {String} data.token Access token for the authenticated user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "code": 200,
 *       "message": "User authenticated successfully.",
 *       "data": {
 *           "token": "ACCESS_TOKEN"
 *       }
 *     }
 *
 * @apiError {Boolean} success Whether or not the request was successful.
 * @apiError {Number} code The HTTP status code returned by the server.
 * @apiError {String} message A message explaining the status of the request.
 * @apiError {String} field The field in which the error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "success": false,
 *       "code": 401,
 *       "message": "Invalid email or password.",
 *       "field": "email"
 *     }
 */




/**
 * @api {post} /api/user Create User
 * @apiVersion 1.0.0
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiDescription This endpoint allows a user to be created by providing required user data. If successful, the new user data will be returned in the response.
 *
 * @apiBody {String} firstname First name of the user.
 * @apiBody {String} lastname Last name of the user.
 * @apiBody {String} email Email address of the user.
 * @apiBody {String} password Password for the user account.
 * @apiBody {String} phone Phone number of the user.
 * @apiBody {String} nationalId National ID of the user.
 *
 * @apiSuccess {Boolean} success Whether or not the request was successful.
 * @apiSuccess {Number} code The HTTP status code returned by the server.
 * @apiSuccess {String} message A message explaining the status of the request.
 * @apiSuccess {Object} data The data returned by the endpoint.
 * @apiSuccess {Number} data.id The ID of the newly created user.
 * @apiSuccess {String} data.username The username of the newly created user.
 * @apiSuccess {String} data.firstname The first name of the newly created user.
 * @apiSuccess {String} data.lastname The last name of the newly created user.
 * @apiSuccess {String} data.email The email address of the newly created user.
 * @apiSuccess {Boolean} data.isEmailConfirmed Whether or not the user's email address has been confirmed.
 * @apiSuccess {String} data.phone The phone number of the newly created user.
 * @apiSuccess {String} data.nationalId The national ID of the newly created user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "success": true,
 *       "code": 201,
 *       "message": "User created successfully.",
 *       "data": {
 *           "id": 123,
 *           "username": "johndoe",
 *           "firstname": "John",
 *           "lastname": "Doe",
 *           "email": "johndoe@example.com",
 *           "isEmailConfirmed": false,
 *           "phone": "+1234567890",
 *           "nationalId": "ABC123"
 *       }
 *     }
 *
 * @apiError {Boolean} success Whether or not the request was successful.
 * @apiError {Number} code The HTTP status code returned by the server.
 * @apiError {String} message A message explaining the status of the request.
 * @apiError {String} field The field in which the error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "success": false,
 *       "code": 400,
 *       "message": "Missing required field(s).",
 *       "field": "email"
 *     }
 */


/**
* @api {get} /api/user/receive/confirmation/email/:token Receive email confirmation
* @apiName receiveConfirmationEmail
* @apiGroup User
* @apiDescription __Access Level :__ visitor <br/>
* You probably don't need to deal with this endpoint, and 
* probably you will get an error if you don't have the exact same link sent to the user email 
* @apiParam {String} token Unique token
* 
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
*	"success" : true,
*	"code" : 202,
*	"message" : "email confirmed",
*	"data" : {}
* }
*/

/**
 * @api {get} /api/user Get User(s)
 * @apiDescription Returns information about a user or an array of users.
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization User or Admin JWT token.
 *
 * @apiParam (Query) {Number} [id] User ID to retrieve. Only for admin.
 * @apiParam (Query) {String} [email] Email to filter users by. Only for admin.
 * @apiParam (Query) {Number=0,1} [isEmailConfirmed] Email confirmed status to filter users by. Only for admin.
 * @apiParam (Query) {Number} [page=1] Page number for pagination. Only for admin.
 * @apiParam (Query) {Number} [limit=20] Number of users per page for pagination. Only for admin.
 *
 * @apiSuccess {Boolean} success Request status.
 * @apiSuccess {Number} code Request status code.
 * @apiSuccess {String} message Request status message.
 * @apiSuccess {Object|Array} data User or array of users.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "code": 200,
 *       "message": "Data fetched",
 *       "data": {
 *         "id": 1,
 *         "username": "test_1",
 *         "firstname": "test",
 *         "lastname": "test",
 *         "email": "test@test.com",
 *         "isEmailConfirmed": true,
 *         "phone": "+213667667067",
 *         "nationalId": "123456789"
 *       }
 *     }
 *
 * @apiError {Boolean} success Request status.
 * @apiError {Number} code Request status code.
 * @apiError {String} message Request status message.
 * @apiError {String} field Name of the field that caused the error.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 301 Unauthorized
 *     {
 *       "success": false,
 *       "code": 301,
 *       "message": "You are not logged in",
 *       "field": "token"
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i -H "Authorization: Bearer {user_token}" http://localhost:3000/api/users?id=1
 *     curl -i -H "Authorization: Bearer {admin_token}" http://localhost:3000/api/users?isEmailConfirmed=1&email=test@test.com
 *
 * @apiExample {javascript} Example usage:
 *     axios.get('/api/users?id=1', { headers: { Authorization: `Bearer {user_token}` } })
 *     axios.get('/api/users?isEmailConfirmed=1&email=test@test.com', { headers: { Authorization: `Bearer {admin_token}` } })
 */


/**
* @api {get} /api/user/:id Get user data by id
* @apiName getUserById
* @apiGroup User
* @apiDescription __Access Level :__ user admin <br/>
* To fetch user data send `GET` request to 
* `/api/user/:id` endpoint where `:id` is the user id :
* @apiHeader {String} Authorization User or Admin Authorization token.
* @apiParam {Number} id User unique id
* @apiSuccess {Object} Data User Data
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "data fetched",
*	"data" : {
*		"id" : 1,
*		"username" : "test_1",
*		"firstname" : "test",
*		"lastname" : "test",
*		"email" : "example@example.com",
*		"isEmailConfirmed" : true,
*		"phone" : "+213667667067",
*		"nationalId" : "123456789"
*	}
* }
*/

/**
* @api {put} /api/user Update user
* @apiName updateUser
* @apiGroup User
* @apiDescription __Access Level :__ user <br/>
* To update the user data send `PUT` request to 
* `/api/user` endpoint, make sure to include the data you want to 
* modify in the request body :
* @apiHeader {String} Authorization User Authorization token.
* @apiBody {String} [firstname] first name
* @apiBody {String} [lastname] last name
* @apiBody {String} [email] email 
* @apiBody {String} [password] password
* @apiBody {String} [phone] phone number
* @apiBody {String} [nationalId] national Id
* 
* @apiSuccess {Object} Data The updated user data.
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "user updated",
*	"data" : {
*		"id" : 1,
*		"username" : "test_1",
*		"firstname" : "test",
*		"lastname" : "test",
*		"email" : "example@example.com",
*		"isEmailConfirmed" : false,
*		"phone" : "+213667667067",
*		"nationalId" : "123456789"
*	}
* }
*/

/**
* @api {delete} /api/user Delete user
* @apiName deleteUser
* @apiGroup User
* @apiDescription __Access Level :__ user <br/>
* To delete a user send `DELETE` request to `/api/user` endpoint :
* @apiHeader {String} Authorization User Authorization token.
* @apiSuccess {Object} Data The deleted user data.
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "user deleted",
*	"data" : {
*		"id" : 1,
*		"username" : "test_1",
*		"firstname" : "test",
*		"lastname" : "test",
*		"email" : "example@example.com",
*		"isEmailConfirmed" : false,
*		"phone" : "+213667667067",
*		"nationalId" : "123456789"
*	}
* }
*/


/**
* @api {get} /api/user/send/confirmation/email Send a confirmation email
* @apiName sendConfirmationEmail
* @apiGroup User
* @apiDescription __Access Level :__ user <br/>
* Send a unique url to the user email, when the user clicks the link his email will be confirmed
* @apiHeader {String} Authorization User Authorization token.
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
*	"success" : true,
*	"code" : 200,
*	"message" : "email has been sent",
*	"data" : {}
* }
*/

/**
* @api {delete} /api/user/:id Delete user by id
* @apiName deleteUserById
* @apiGroup User
* @apiDescription __Access Level :__ admin <br/>
* to Delete a user send `DELETE` request to `/api/user/:id`
* endpoint where `:id` is the user unique id :
* @apiHeader {String} Authorization Admin Authorization token.
* @apiParam {Number} id User unique id
* @apiSuccess {Object} Data The deleted user data.
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
* 	"success" : true,
*	"code" : 200,
*	"message" : "user deleted",
*	"data" : {
*		"id" : 1,
*		"username" : "test_1",
*		"firstname" : "test",
*		"lastname" : "test",
*		"email" : "example@example.com",
*		"isEmailConfirmed" : false,
*		"phone" : "+213667667067",
*		"nationalId" : "123456789"
*	}
* }
*/
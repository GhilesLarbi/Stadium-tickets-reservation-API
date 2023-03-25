/**
* @api {post} /api/user/login User login 
* @apiName loginUser
* @apiGroup User 
* @apiDescription __Access Level :__ visitor <br/>
* To login as a user and obtain an access token, send 
* `POST` request to `/api/user/login` endpoint :
* @apiBody {String} email User email
* @apiBody {String} password User Password
* @apiSuccess {String} token User access token.
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
*	"success" : true,
*	"code" : 200,
*	"message" : "user loged in",
*	"data" : {
*		"token" : "ACCESS_TOKEN"
*	}
* }
*/


/**
* @api {post} /api/user Create user
* @apiName createUser
* @apiGroup User
* @apiDescription __Access Level :__ visitor <br/>
* To create new user send `POST` request to 
* `/api/user` endpoint and make sure to include the 
* data needed in the request body :
* 
* @apiBody {String} firstname User first name
* @apiBody {String} lastname User last name
* @apiBody {String} email User email 
* @apiBody {String} password User password
* @apiBody {String} phone User phone number
* @apiBody {String} nationalId User national Id
* 
* @apiSuccess {String} Data The new user data.
* @apiSuccessExample Success-Response:
* HTTP/1.1 201 CREATED
* {
* 	"success" : true,
*	"code" : 201,
*	"message" : "user created",
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
* @api {get} /api/user Get user data
* @apiName getUser
* @apiGroup User
* @apiDescription __Access Level :__ user admin <br/>
* To fetch user data send a `GET` request to 
* `/api/user` endpoint :
* @apiHeader {String} Authorization User or Admin Authorization token.
* @apiSuccess {Object} Data User Data
* @apiSuccessExample response (user token):
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
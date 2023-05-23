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
* {
*	"success" : true,
*	"code" : 202,
*	"message" : "email confirmed",
*	"data" : {}
* }
*/


/**
 * @api {get} /api/user Get User Information
 * @apiGroup User
 * @apiDescription This endpoint returns the user information or an array of users based on the access token provided.
 *
 * If an admin access token is provided, an array of users can be fetched and pagination and filtering can be applied. If a user access token is provided, only the user's information is returned.
 *
 * @apiHeader {String} Authorization Bearer access token.
 *
 * @apiQuery {Number} [page=1] Page number for pagination (admin only).
 * @apiQuery {Number} [limit=20] Number of users to fetch per page (admin only).
 * @apiQuery {Number} [id] Filter users by user ID (admin only).
 * @apiQuery {String} [email] Filter users by email address (admin only).
 * @apiQuery {Number} [isEmailConfirmed] Filter users by email confirmation status (admin only).
 * @apiQuery {Boolean} [count] If set to true, returns the number of users matching the specified filters (admin only).
 *
 * @apiSuccess {Boolean} success Indicates whether the request was successful.
 * @apiSuccess {Number} code HTTP status code for the response.
 * @apiSuccess {String} message A message indicating the result of the request.
 * @apiSuccess {Object|Array} data The user information or array of users.
 *
 * @apiSuccessExample {json} Successful Response (Admin):
 *     {
 *         "success": true,
 *         "code": 200,
 *         "message": "Users fetched successfully.",
 *         "data": [
 *             {
 *                 "id": 1,
 *                 "username": "user1",
 *                 "firstname": "John",
 *                 "lastname": "Doe",
 *                 "email": "johndoe@example.com",
 *                 "isEmailConfirmed": false,
 *                 "phone": "555-1234",
 *                 "nationalId": "1234567890"
 *             },
 *             {
 *                 "id": 2,
 *                 "username": "user2",
 *                 "firstname": "Jane",
 *                 "lastname": "Doe",
 *                 "email": "janedoe@example.com",
 *                 "isEmailConfirmed": true,
 *                 "phone": "555-5678",
 *                 "nationalId": "0987654321"
 *             }
 *         ]
 *     }
 *
 * @apiSuccessExample {json} Successful Response (User):
 *     {
 *         "success": true,
 *         "code": 200,
 *         "message": "User fetched successfully.",
 *         "data": {
 *             "id": 1,
 *             "username": "user1",
 *             "firstname": "John",
 *             "lastname": "Doe",
 *             "email": "johndoe@example.com",
 *             "isEmailConfirmed": false,
 *             "phone": "555-1234",
 *             "nationalId": "1234567890"
 *         }
 *     }
 *
 * @apiErrorExample {json} Error Response:
 *     {
 *         "success": false,
 *         "code": 401,
 *         "message": "Authorization failed. Access token invalid or expired.",
 *         "data": null
 *     }
 */






/**
 * @api {get} /api/user/:id Get User By ID
 * @apiDescription Get user information by ID. Only admins and the user themselves have access.
 * @apiName GetUserById
 * @apiGroup User
 *
 * @apiParam {Number} id User ID.
 *
 * @apiHeader {String} Authorization User access token with the format `Bearer [token]`.
 *
 * @apiParam (Query) {String} [include] Include additional information. Possible values: `ticket`.
 *
 * @apiSuccess {Object} data User data.
 * @apiSuccess {Number} data.id User ID.
 * @apiSuccess {String} data.username Username.
 * @apiSuccess {String} data.firstname First name.
 * @apiSuccess {String} data.lastname Last name.
 * @apiSuccess {String} data.email Email address.
 * @apiSuccess {Boolean} data.isEmailConfirmed Whether the email is confirmed or not.
 * @apiSuccess {String} data.phone Phone number.
 * @apiSuccess {String} data.nationalId National ID.
 * @apiSuccess {Array} [data.tickets] Array of user's tickets (only included if `include=ticket`).
 * @apiSuccess {Number} data.tickets.id Ticket ID.
 * @apiSuccess {String} data.tickets.createdAt Creation date and time (ISO format).
 * @apiSuccess {Number} data.tickets.gameId ID of the game the ticket is for.
 * @apiSuccess {String} data.tickets.bleacherType Type of bleacher for the ticket (VIP, EB, WT, etc.).
 * @apiSuccess {Number} data.tickets.userId ID of the user the ticket belongs to.
 *
 * @apiError (Error 401) Unauthorized User is not authorized to access this resource.
 * @apiError (Error 404) NotFound User with the specified ID not found.
 *
 * @apiExample Example response (with include=ticket):
 * {
 *     "code": 200,
 *     "success": true,
 *     "message": "User data retrieved successfully",
 *     "data": {
 *         "id": 12345,
 *         "username": "john.doe",
 *         "firstname": "John",
 *         "lastname": "Doe",
 *         "email": "john.doe@example.com",
 *         "isEmailConfirmed": true,
 *         "phone": "555-1234",
 *         "nationalId": "1234567890",
 *         "tickets": [
 *             {
 *                 "id": 1,
 *                 "createdAt": "2023-03-26T15:00:00.000Z",
 *                 "gameId": 100,
 *                 "bleacherType": "VIP",
 *                 "userId": 12345
 *             },
 *             {
 *                 "id": 2,
 *                 "createdAt": "2023-03-28T10:30:00.000Z",
 *                 "gameId": 101,
 *                 "bleacherType": "EB",
 *                 "userId": 12345
 *             }
 *         ]
 *     }
 * }
 */



/**
* @api {put} /api/user Update User
* @apiName UpdateUser
* @apiGroup User
*
* @apiDescription This endpoint allows a user to update their profile information.
To update any information, a `PUT` request should be sent to `/api/user` with the relevant information included in the request body. 
Users must be authenticated to access this endpoint, which requires an authorization token to be included in the request headers.
*
* @apiHeader {String} Authorization User authorization token.
*
* @apiBody {String} [firstname] User's first name.
* @apiBody {String} [lastname] User's last name.
* @apiBody {String} [email] User's email address.
* @apiBody {String} [password] User's password.
* @apiBody {String} [phone] User's phone number.
* @apiBody {String} [nationalId] User's national ID number.
*
* @apiSuccess {Object} data The updated user data.
* @apiSuccessExample Success-Response:
*     {
*       "success": true,
*       "code": 200,
*       "message": "User updated successfully.",
*       "data": {
*           "id": 1,
*           "username": "johndoe123",
*           "firstname": "John",
*           "lastname": "Doe",
*           "email": "johndoe@gmail.com",
*           "isEmailConfirmed": true,
*           "phone": "+1 234 567 8901",
*           "nationalId": "123456789"
*       }
*     }
*
*/




/**
 * @api {delete} /api/user Delete User
 * @apiName deleteUser
 * @apiGroup User
 * 
 * @apiDescription This endpoint allows a user to delete their own account. To delete a user account, send a `DELETE` request to `/api/user` with the user's authorization token in the header.
 * 
 * @apiHeader {String} Authorization User's authorization token.
 * 
 * @apiSuccessExample Success Response:
 *     {
 *         "success": true,
 *         "code": 200,
 *         "message": "User deleted",
 *         "data": {
 *             "id": 1,
 *             "username": "test_1",
 *             "firstname": "test",
 *             "lastname": "test",
 *             "email": "example@example.com",
 *             "isEmailConfirmed": false,
 *             "phone": "+213667667067",
 *             "nationalId": "123456789"
 *         }
 *     }
 *
 * @apiErrorExample Error Response:
 *     {
 *         "success": false,
 *         "code": 401,
 *         "message": "Unauthorized"
 *     }
 */




/**
* @api {get} /api/user/send/confirmation/email Send Confirmation Email
* @apiName sendConfirmationEmail
* @apiGroup User
* @apiDescription Send a confirmation email to the user's email address to confirm their account.
*
* This endpoint can be accessed by a user with the access level of "user".
*
* When the confirmation email is sent, a unique URL is included in the email. When the user clicks on this URL,
* their email address will be confirmed and they will be able to access their account.
*
* @apiHeader {String} Authorization User authorization token.
*
* @apiSuccess {Object} Data An empty object.
*
* @apiSuccessExample Success-Response:
*     {
*       "success": true,
*       "code": 200,
*       "message": "Email has been sent",
*       "data": {}
*     }
*/






/**
 * @api {delete} /api/user/:id Delete user by ID
 * @apiName deleteUserById
 * @apiGroup User
 * @apiDescription __Access Level:__ Admin <br/>
 * Allows an admin user to delete any user by providing the user's unique ID in the URL parameters.
 * <br/><br/>
 * __Access Level:__ User <br/>
 * A regular user can delete their own account by providing their own ID in the URL parameters.
 * <br/><br/>
 * If the user ID provided by a regular user does not match their own ID, an "unauthorized" error will occur.
 * 
 * @apiHeader {String} Authorization Admin or user Authorization token.
 * 
 * @apiParam {Number} id User unique ID.
 * 
 * @apiSuccess {Object} data The deleted user's data.
 * 
 * @apiSuccessExample {json} Success-Response (Admin):
 * {
 *     "success": true,
 *     "code": 200,
 *     "message": "User deleted",
 *     "data": {
 *         "id": 1,
 *         "username": "test_1",
 *         "firstname": "test",
 *         "lastname": "test",
 *         "email": "example@example.com",
 *         "isEmailConfirmed": false,
 *         "phone": "+213667667067",
 *         "nationalId": "123456789"
 *     }
 * }
 * 
 * @apiSuccessExample {json} Success-Response (User):
 * {
 *     "success": true,
 *     "code": 200,
 *     "message": "Your account has been deleted",
 *     "data": {
 *         "id": 1,
 *         "username": "test_1",
 *         "firstname": "test",
 *         "lastname": "test",
 *         "email": "example@example.com",
 *         "isEmailConfirmed": false,
 *         "phone": "+213667667067",
 *         "nationalId": "123456789"
 *     }
 * }
 * 
 * @apiErrorExample {json} Unauthorized:
 * {
 *     "success": false,
 *     "code": 401,
 *     "message": "You are not authorized to perform this action",
 *     "field": "token"
 * }
 * 
 * @apiErrorExample {json} Not Found:
 * {
 *     "success": false,
 *     "code": 404,
 *     "message": "User not found",
 *     "field": "userId"
 * }
 * 
 */
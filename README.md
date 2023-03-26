<a name="top"></a>
# Stadium tickets reservation API v1.0.0

 

<h2>Technologies</h2>
<ul>
<li><strong>Server:</strong> Node.js (express)</li>
<li><strong>Database:</strong> Mariadb (sequelize)</li>
<li><strong>Authentication:</strong> JWT</li>
<li><strong>Encryption:</strong> Bcrypt</li>
<li><strong>Restriction:</strong> Cors</li>
<li><strong>Payment:</strong> Stripe API</li>
<li><strong>Email:</strong> Nodemailer</li>
<li><strong>QR code:</strong> qrcode package</li>
<li><strong>PDF:</strong> pdfkit package</li>
</ul>
<h2>Features</h2>
<ul>
<li>Authentication &amp;&amp; Authorization</li>
<li>Pseudo Restful API</li>
<li>Query searchs</li>
<li>Generate QR codes</li>
<li>Create PDF files</li>
<li>Confirm users emails</li>
<li>Serve &amp;&amp; upload images</li>
</ul>
<hr />
<h1>Quick access</h1>
<ul>
<li><a href="#Installation">Installation</a></li>
<li><a href="#Authentication">Authentication</a></li>
<li><a href="#Response-Template">Response Template</a></li>
<li><a href="#Authorization">Authorization</a></li>
<li><a href="#Query">Query</a></li>
<li><a href="#Pagination">Pagination</a></li>
<li><a href="#Endpoints">Endpoints</a></li>
</ul>
<hr />
<h1>Installation</h1>
<p>To run the API locally you need to install :</p>
<ul>
<li>Node.js +v18.13.0</li>
<li>Mariadb +v10.6.11</li>
</ul>
<p>Clone this repository to your local machine</p>
<pre><code class="language-bash">git clone https://github.com/GhilesLarbi/Stadium-tickets-reservation-API.git
</code></pre>
<p>Change directory to the repository folder</p>
<pre><code class="language-bash">cd Stadium-tickets-reservation-API
</code></pre>
<p>Install nodemon package for development</p>
<pre><code class="language-bash">npm install nodemon --save-dev
</code></pre>
<p>Install dependencies</p>
<pre><code class="language-bash">npm install
</code></pre>
<p>if you face any issues while installing dependencies
especially on windows OS try :</p>
<pre><code class="language-bash">npm install --no-bin-links
</code></pre>
<p>Start and configure your mariadb server and make sure the user have the <code>READ</code> and the <code>WRITE</code> privileges
Then create an empty database
for example <code>db_test</code> :</p>
<pre><code class="language-sql">CREATE DATABASE db_test;
</code></pre>
<p>Add your mariadb server credentials to the <code>.env</code> file located in the repository folder :</p>
<pre><code class="language-javascript">DB_HOST = 127.0.0.1
DB_PORT = 3306
DB_USER = root // mariadb username
DB_PASSWORD = root // mariadb password
DB_NAME = db_test // database name
</code></pre>
<p>Now seed the database :</p>
<pre><code class="language-bash">npm run seed-database
</code></pre>
<p>This command will create the right tables and seed them with dummy data</p>
<p>Finally, you can start the server and listen to requests by executing eather the dev command :</p>
<pre><code class="language-bash">npm run dev
</code></pre>
<p>or the normal one :</p>
<pre><code class="language-bash">npm start
</code></pre>
<p>By default the server will start on <code>PORT</code> 3000.
You can change the default port by adding <code>PORT</code> variable to <code>.env</code> file :</p>
<pre><code class="language-javascript">PORT = 8080
</code></pre>
<hr />
<h1>Authentication</h1>
<p>Some endpoints may require authentication for example to fetch your tickets data, you need to <a href="#User##login">login</a> your API client as a user and obtain an access token.</p>
<p>The endpoints that require authentication expect a bearer token sent in the <code>Authorizarion header</code></p>
<p><strong>Example:</strong></p>
<p>Fetch all your tickets</p>
<pre><code class="language-http">GET /api/ticket
Authorization: Bearer ACCESS_TOKEN
</code></pre>
<p>If you don't include the <code>Authorization header</code> you will get a <code>401</code> status code with a response like this :</p>
<pre><code class="language-json">{
    "success" : false,
    "code" : 401,
    "message" : "you are not leged in",
    "field" : "token"
}
</code></pre>
<p>To get an access token you have to login as a <a href="#User##Login">User</a> or as an <a href="#Admin##Login">Admin</a></p>
<hr />
<h1>Response Template</h1>
<p>When you send a request, the server will respond with json data, all responses have a similar format
For example when sendeing :</p>
<pre><code class="language-http">GET /api/team/1
</code></pre>
<p>The response may look like this :</p>
<pre><code class="language-json">{
    "success" : true,
    "code" : 200,
    "message" : "data fetched",
    "results" : 1,
    "data" : {
            "id" : 1,
            "name" : "JSK",
            "logo" : "/images/team/jsk-1.png",
            "captainName" : null,
            "captainImage" : null
    }
}
</code></pre>
<h3><strong><code>success</code> :</strong></h3>
<p>represents the response state, if it is true then everything ran as expected, false if something went wrong
For example if the <code>id</code> on the request is not found you may get :</p>
<pre><code class="language-http">GET /api/team/1928
</code></pre>
<pre><code class="language-json">{
    "success" : false,
    "code" : 404,
    "message" : "team not found",
    "field" : "teamId"
}
</code></pre>
<h3><strong><code>code</code> :</strong></h3>
<p>is the response status code
Here are some status codes that you might see a lot :</p>
<p><code>200</code> : <code>everything ok</code> <br/>
<code>201</code> : <code>created</code> <br/>
<code>202</code> : <code>accepted</code> <br/>
<code>204</code> : <code>no content</code> <br/></p>
<p><code>400</code> : <code>bad request</code> <br/>
<code>401</code> : <code>unautorized</code> <br/>
<code>402</code> : <code>payement required</code> <br/>
<code>403</code> : <code>forbidden</code> <br/>
<code>404</code> : <code>not found</code> <br/>
<code>405</code> : <code>method not allowd</code> <br/>
<code>406</code> : <code>not acceptable</code> <br/></p>
<p><code>500</code> : <code>internal server error</code> <br/>
<code>501</code> : <code>not implemented</code> <br/></p>
<h3><strong><code>message</code> :</strong></h3>
<p>sometimes the status code alone cannot explain what happened exactly on the server, you can read this message instead</p>
<h3><strong><code>data</code> :</strong></h3>
<p>It's the actual data fetched from the server, this field is not always filled for example when error occurs or sending an email to confirm or uploading a logo you get an empty object, or when you try to fetch users with wrong pagination queries, you get an empty array</p>
<h3><strong><code>field</code> :</strong></h3>
<p>When an error occurs this field will be included on the response object, from here you can exactly know where you missed up</p>
<hr />
<h1>Authorization</h1>
<p>Some endpoints have specific access level, meaning that if you try to access that endpoint with a non-authorized client you will get an error
For example if you try to create a team with a <code>user token</code> you will get :</p>
<pre><code class="language-json">{
    "success" : false,
    "code" : 401,
    "message" : "you are not authorized",
    "field" : "token"
}
</code></pre>
<p>From now on each endpoint will be marked with an access level defining which client have access to that endpoint
There are 4 different clients :</p>
<ul>
<li>
<h4><code>visitor</code></h4>
</li>
</ul>
<p>is a client without any access token</p>
<ul>
<li>
<h4><code>user</code></h4>
</li>
</ul>
<p>is a client with a <code>user token</code> and a non confirmed email</p>
<ul>
<li>
<h4><code>valid-user</code></h4>
</li>
</ul>
<p>is a client with a <code>user token</code> and a confirmed email</p>
<ul>
<li>
<h4><code>admin</code></h4>
</li>
</ul>
<p>is a client with an <code>admin token</code></p>
<hr />
<h1>Query</h1>
<hr />
<h1>Pagination</h1>
<p>Some endpoints support pagination through query, you can preform pagination using two queries <code>limit</code> and <code>page</code>
<strong>example :</strong>
Fetching users using an <code>admin token</code> if you don't include any query you will get by default 20 users</p>
<pre><code class="language-http">GET /api/user
</code></pre>
<p>You can change that by adding the <code>page</code> query  <code>?page=2</code> to the path</p>
<pre><code class="language-http">GET /api/user/?page=2
</code></pre>
<p>This will fetch the next 20 users, from 20 to 40.</p>
<p>By default you get 20 users each time. You can change that by including the <code>limit</code> query</p>
<pre><code class="language-http">GET /api/user/?limit=10&page=2
</code></pre>
<p>Now you will get an array of users from 10 to 20</p>
<h3>endpoints that support pagination :</h3>
<ul>
<li><a href="##get-user-data">get user data</a></li>
<li><a href="##get-leagues-data">get leagues data</a></li>
<li><a href="##get-teams-data">get teams data</a></li>
<li><a href="##get-games-data">get games data</a></li>
</ul>
<hr />


# Table of contents

- [Admin](#Admin)
  - [Admin login](#Admin-login)
- [Bleacher](#Bleacher)
  - [Create a bleacher](#Create-a-bleacher)
  - [Delete bleacher by type](#Delete-bleacher-by-type)
  - [Get bleacher data by type](#Get-bleacher-data-by-type)
  - [Get bleachers data](#Get-bleachers-data)
  - [Update bleacher](#Update-bleacher)
- [Game](#Game)
  - [Create a game](#Create-a-game)
  - [Delete game by id](#Delete-game-by-id)
  - [Get game data](#Get-game-data)
  - [Get games data](#Get-games-data)
  - [Update game](#Update-game)
- [League](#League)
  - [Create a league](#Create-a-league)
  - [Delete league by id](#Delete-league-by-id)
  - [Get league data by id](#Get-league-data-by-id)
  - [Get leagues data](#Get-leagues-data)
  - [Update league](#Update-league)
  - [Upload league logo](#Upload-league-logo)
- [Team](#Team)
  - [Create a team](#Create-a-team)
  - [Delete team by id](#Delete-team-by-id)
  - [Get team data by id](#Get-team-data-by-id)
  - [Get teams data](#Get-teams-data)
  - [Update team](#Update-team)
  - [Upload team logo](#Upload-team-logo)
- [Ticket](#Ticket)
  - [Buy ticket](#Buy-ticket)
  - [Delete ticket](#Delete-ticket)
  - [Download ticket PDF](#Download-ticket-PDF)
  - [Get tickets data](#Get-tickets-data)
- [User](#User)
  - [Create User](#Create-User)
  - [Delete user](#Delete-user)
  - [Delete user by id](#Delete-user-by-id)
  - [Get user data by id](#Get-user-data-by-id)
  - [Get User Information](#Get-User-Information)
  - [Receive email confirmation](#Receive-email-confirmation)
  - [Send a confirmation email](#Send-a-confirmation-email)
  - [Update user](#Update-user)
  - [User login](#User-login)

___


# <a name='Admin'></a> Admin

## <a name='Admin-login'></a> Admin login
[Back to top](#top)

<p><strong>Access Level :</strong> visitor <br/> To login as an admin and obtain an access token, send <code>POST</code> request to <code>/api/admin/login</code> endpoint, and make sure to include the right credentials in the request body :</p>

```
POST /api/admin/login
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `String` | <p>Admin user name</p> |
| password | `String` | <p>Admin Password</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>Admin access token.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "user loged in",
	"data" : {
		"token" : "ADMIN_ACCESS_TOKEN"
	}
}
```

# <a name='Bleacher'></a> Bleacher

## <a name='Create-a-bleacher'></a> Create a bleacher
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> To create a bleacher send <code>POST</code> request to <code>/api/bleacher</code> endpoint, make sure to include the data needed in the request body :</p>

```
POST /api/bleacher
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token.</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| type | `String` | <p>Bleacher type</p> |
| price | `Number` | <p>Bleacher price</p> |
| quantity | `number` | <p>number of places</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The new created bleacher</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201 CREATED
{
	"success" : true,
	"code" : 201,
	"message" : "bleacher created",
	"data" : {
		"type" : "VIP",
		"price" : 2000,
		"quantity" : 100,
	}
}
```

## <a name='Delete-bleacher-by-type'></a> Delete bleacher by type
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> to delete a bleacher send <code>DELETE</code> request to <code>/api/bleacher/:type</code> endpoint where <code>:type</code> is the bleacher type :</p>

```
DELETE /api/bleacher/:type
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| type | `String` | <p>Bleacher type</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The deleted bleacher data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "bleacher deleted",
	"data" : {
		"type" : "VIP",
		"price" : 2000,
		"quantity" : 100,
	}
}
```

## <a name='Get-bleacher-data-by-type'></a> Get bleacher data by type
[Back to top](#top)

<p><strong>Access Level :</strong> visitor <br/> To fetch bleacher data send <code>GET</code> request to <code>/api/team/:type</code> endpoint, where <code>type</code> is the bleacher type :</p>

```
GET /api/bleacher/:type
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| type | `String` | <p>bleacher type</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>bleacher data</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "data fetched",
	"data" : {
		"type" : "VIP",
		"price" : 2000,
		"quantity" : 100,
	}
}
```

## <a name='Get-bleachers-data'></a> Get bleachers data
[Back to top](#top)

<p><strong>Access Level :</strong> visitor <br/> To fetch bleachers data send <code>GET</code> request to <code>/api/bleacher</code> endpoint :</p>

```
GET /api/bleacher
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Array` | <p>Array of bleachers data</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "data fetched",
	"data" : [
		{
			"type" : "EB",
			"price" : 300,
			"quantity" : 8000,
		},
		{
			"type" : "WT",
			"price" : 500,
			"quantity" : 4000,
		},
		{
			"type" : "VIP",
			"price" : 2000,
			"quantity" : 100,
		}
	]
}
```

## <a name='Update-bleacher'></a> Update bleacher
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> To update the bleacher data send <code>PUT</code> request to <code>/api/bleacher/:type</code> endpoint, where <code>:type</code> is the bleacher type. Make sure to include the data you want to modify in the request body :</p>

```
PUT /api/bleacher/:type
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| type | `String` | <p>Bleacher type</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| type | `String` | **optional** <p>Bleacher type</p> |
| price | `Number` | **optional** <p>Bleacher price</p> |
| quantity | `number` | **optional** <p>number of places</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The updated bleacher data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "bleacher updated",
	"data" : {
		"type" : "VIP",
		"price" : 4000,
		"quantity" : 100,
	}
}
```

# <a name='Game'></a> Game

## <a name='Create-a-game'></a> Create a game
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> To create a game send <code>POST</code> request to <code>/api/game</code> endpoint, make sure to include the data needed in the request body :</p>

```
POST /api/game
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token.</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| date | `Date` | <p>The game date</p> |
| description | `String` | <p>The game description</p> |
| leagueId | `Number` | <p>league unique id</p> |
| score | `String` | <p>The game score</p> |
| team1Id | `Number` | <p>Team 1 unique id</p> |
| team2Id | `Number` | <p>Team 2 unique id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The new created league</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201 CREATED
{
	"success" : true,
	"code" : 201,
	"message" : "game created",
	"data" : {
		"id": 1,
		"date": "2023-11-09T00:00:00.000Z",
		"description": "semi-final",
		"leagueId": 1,
		"score": null,
		"team1Id": 1,
		"team2Id": 2
	}
}
```

## <a name='Delete-game-by-id'></a> Delete game by id
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> to Delete a game send <code>DELETE</code> request to <code>/api/game/:id</code> endpoint where <code>:id</code> is the game unique id :</p>

```
DELETE /api/game/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Game unique id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The deleted game data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "game deleted",
	"data" : {
		"id": 1,
		"date": "2023-11-09T00:00:00.000Z",
		"description": "semi-final",
		"leagueId": 1,
		"score": null,
		"team1Id": 1,
		"team2Id": 2
	}
}
```

## <a name='Get-game-data'></a> Get game data
[Back to top](#top)

<p><strong>Access Level :</strong> visitor <br/> To fetch game data send <code>GET</code> request to <code>/api/game/:id</code> endpoint where <code>:id</code> is the game unique id :</p>

```
GET /api/game/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Game unique id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>game data</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "data fetched",
	"data" : {
		"id": 1,
		"date": "2023-11-09T00:00:00.000Z",
		"description": "semi-final",
		"leagueId": 1,
		"score": null,
		"team1Id": 1,
		"team2Id": 2
	}
}
```

## <a name='Get-games-data'></a> Get games data
[Back to top](#top)

<p><strong>Access Level :</strong> visitor <br/> To fetch games data send <code>GET</code> request to <code>/api/game</code> endpoint :</p>

```
GET /api/game
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object[]` | <p>Array of games data</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "data fetched",
	"data" : [
		{
			"id": 1,
			"date": "2023-11-09T00:00:00.000Z",
			"description": "semi-final",
			"leagueId": 1,
			"score": null,
			"team1Id": 1,
			"team2Id": 2
		},
		{
			"id": 2,
			"date": "2023-01-04T00:00:00.000Z",
			"description": "final",
			"leagueId": 2,
			"score": null,
			"team1Id": 1,
			"team2Id": 4
		},
	]
}
```

## <a name='Update-game'></a> Update game
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> To update the game data send <code>PUT</code> request to <code>/api/game/:id</code> endpoint, where <code>:id</code> is the game unique id. Make sure to include the data you want to modify in the request body :</p>

```
PUT /api/game/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Game unique id</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| date | `Date` | **optional** <p>The game date</p> |
| description | `String` | **optional** <p>The game description</p> |
| leagueId | `Number` | **optional** <p>league unique id</p> |
| score | `String` | **optional** <p>The game score</p> |
| team1Id | `Number` | **optional** <p>Team 1 unique id</p> |
| team2Id | `Number` | **optional** <p>Team 2 unique id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The updated game data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "game updated",
	"data" : {
		"id": 1,
		"date": "2023-11-09T00:00:00.000Z",
		"description": "semi-final",
		"leagueId": 1,
		"score": null,
		"team1Id": 1,
		"team2Id": 2
	}
}
```

# <a name='League'></a> League

## <a name='Create-a-league'></a> Create a league
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> To create a league send <code>POST</code> request to <code>/api/league</code> endpoint, make sure to include the data needed in the request body :</p>

```
POST /api/league
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token.</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | <p>The league name</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The new created league</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201 CREATED
{
	"success" : true,
	"code" : 201,
	"message" : "league created",
	"data" : {
		"id" : 5,
		"name" : "LIGA",
		"logo" : "/images/league/default.png",
	}
}
```

## <a name='Delete-league-by-id'></a> Delete league by id
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> to Delete a league send <code>DELETE</code> request to <code>/api/league/:id</code> endpoint where <code>:id</code> is the league unique id :</p>

```
DELETE /api/league/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>League unique id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The deleted league data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "league deleted",
	"data" : {
		"id" : 1,
		"name" : "LIGA",
		"logo" : "/images/league/liga.png",
	}
}
```

## <a name='Get-league-data-by-id'></a> Get league data by id
[Back to top](#top)

<p><strong>Access Level :</strong> visitor <br/> To fetch league data send <code>GET</code> request to <code>/api/league/:id</code> endpoint, where <code>id</code> is the league unique id :</p>

```
GET /api/league/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>league unique id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>league data</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "data fetched",
	"data" : {
		"id" : 1,
		"name" : "LIGA",
		"logo" : "/images/league/liga.png",
	}
}
```

## <a name='Get-leagues-data'></a> Get leagues data
[Back to top](#top)

<p><strong>Access Level :</strong> visitor <br/> To fetch leagues data send <code>GET</code> request to <code>/api/league</code> endpoint :</p>

```
GET /api/league
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>Array of leagues data</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "data fetched",
	"data" : [
		{
			"id" : 1,
			"name" : "LIGA",
			"logo" : "/images/league/liga.png",
		},
		{
			"id" : 2,
			"name" : "CAN",
			"logo" : "/images/league/can.png",
		}
	]
}
```

## <a name='Update-league'></a> Update league
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> To update the league data send <code>PUT</code> request to <code>/api/league/:id</code> endpoint, where <code>:id</code> is the league unique id. Make sure to include the data you want to modify in the request body :</p>

```
PUT /api/league/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>User Authorization token.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>League unique id</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | **optional** <p>league name</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The updated league data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "league updated",
	"data" : {
		"id" : 1,
		"name" : "LIGA_1",
		"logo" : "/images/league/liga.png",
	}
}
```

## <a name='Upload-league-logo'></a> Upload league logo
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> To upload a league logo send <code>POST</code> request to <code>/api/league/:id/upload/logo</code> endpoint where <code>:id</code> is the league unique id, Make sure to include the logo image in the request body as <code>FormData</code>:</p>

```
POST /api/league/:id/upload/logo
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>League unique id</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Image | `Image` | <p>The logo image</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The league data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "logo uploaded",
	"data" : {
		"id" : 1,
		"name" : "LIGA",
		"logo" : "/images/league/liga.png",
	}
}
```

# <a name='Team'></a> Team

## <a name='Create-a-team'></a> Create a team
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> To create a team send <code>POST</code> request to <code>/api/team</code> endpoint, make sure to include the data needed in the request body :</p>

```
POST /api/team
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token.</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | <p>The team name</p> |
| captainName | `String` | <p>The captainName</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The new created team</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201 CREATED
{
	"success" : true,
	"code" : 201,
	"message" : "team created",
	"data" : {
		"id" : 1,
		"name" : "JSK",
		"logo" : "/images/team/jsk-1.png",
		"captainName" : null,
		"captainLogo" : null
	}
}
```

## <a name='Delete-team-by-id'></a> Delete team by id
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> to Delete a team send <code>DELETE</code> request to <code>/api/team/:id</code> endpoint where <code>:id</code> is the team unique id :</p>

```
DELETE /api/team/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Team unique id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The deleted team data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "team deletdd",
	"data" : {
		"id" : 1,
		"name" : "JSK",
		"logo" : "/images/team/jsk-1.png",
		"captainName" : null,
		"captainLogo" : null
	}
}
```

## <a name='Get-team-data-by-id'></a> Get team data by id
[Back to top](#top)

<p><strong>Access Level :</strong> visitor <br/> To fetch team data send <code>GET</code> request to <code>/api/team/:id</code> endpoint, where <code>id</code> is the team unique id :</p>

```
GET /api/team/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>team unique id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>teams data</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "data fetched",
	"data" : {
		"id" : 1,
		"name" : "JSK",
		"logo" : "/images/team/jsk-1.png",
		"captainName" : null,
		"captainLogo" : null
	}
}
```

## <a name='Get-teams-data'></a> Get teams data
[Back to top](#top)

<p><strong>Access Level :</strong> visitor <br/> To fetch teams data send <code>GET</code> request to <code>/api/team</code> endpoint :</p>

```
GET /api/team
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>Array of teams data</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "data fetched",
	"data" : [
		{
			"id" : 1,
			"name" : "JSK",
			"logo" : "/images/team/jsk-1.png",
			"captainName" : null,
			"captainLogo" : null
		},
		{
			"id" : 2,
			"name" : "USMA",
			"logo" : "/images/team/usma-2.png",
			"captainName" : null,
			"captainLogo" : null
		}
	]
}
```

## <a name='Update-team'></a> Update team
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> To update the team data send <code>PUT</code> request to <code>/api/team/:id</code> endpoint, where <code>:id</code> is the team unique id. Make sure to include the data you want to modify in the request body :</p>

```
PUT /api/team/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Team unique id</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | **optional** <p>team name</p> |
| captainName | `String` | **optional** <p>captain name</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The updated team data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "team updated",
	"data" : {
		"id" : 1,
		"name" : "JSK",
		"logo" : "/images/team/jsk-1.png",
		"captainName" : null,
		"captainLogo" : null
	}
}
```

## <a name='Upload-team-logo'></a> Upload team logo
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> To upload a team logo send <code>POST</code> request to <code>/api/team/:id/upload/logo</code> endpoint where <code>:id</code> is the team unique id, Make sure to include the logo image in the request body as <code>FormData</code>:</p>

```
POST /api/team/:id/upload/logo
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Team unique id</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Image | `Image` | <p>The logo image</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The team data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "logo uploaded",
	"data" : {
		"id" : 1,
		"name" : "JSK",
		"logo" : "/images/team/jsk-1.png",
		"captainName" : null,
		"captainLogo" : null
	}
}
```

# <a name='Ticket'></a> Ticket

## <a name='Buy-ticket'></a> Buy ticket
[Back to top](#top)

<p><strong>Access Level :</strong> valid-user <br/> To buy a ticket send <code>POST</code> request to <code>/api/ticket</code> endpoint, make sure to include the data needed in the request body :</p>

```
POST /api/ticket
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>User Authorization token.</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| bleacherType | `String` | <p>The bleacher type</p> |
| gameId | `Number` | <p>The game Id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The new created ticket</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201 CREATED
{
	"success" : true,
	"code" : 201,
	"message" : "ticket created",
	"data" : {
		"id" : 1,
		"createdAt" : "2023-07-13",
		"bleacherType" : "VIP",
		"gameId" : 1,
		"userId" : 1
	}
}
```

## <a name='Delete-ticket'></a> Delete ticket
[Back to top](#top)

<p><strong>Access Level :</strong> valid-user admin <br/> To delete a ticket send <code>DELETE</code> request to <code>/api/ticket/:id</code> endpoint, where <code>:id</code> is the ticket unique id :</p>

```
DELETE /api/ticket/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin or Valid User Authorization token.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Ticket unique id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The deleted ticket data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "ticket deleted",
	"data" : {
		"id" : 1,
		"createdAt" : "2023-09-12",
		"bleacherType" : "VIP",
		"gameId" : 1,
		"userId" : 1
	}
}
```

## <a name='Download-ticket-PDF'></a> Download ticket PDF
[Back to top](#top)

<p><strong>Access Level :</strong> valid-user <br/> To get the ticket asset send <code>GET</code> request to <code>/api/ticket/:id/:type</code> endpoint, where <code>:id</code> is the ticket unique id and <code>:type</code> is one of the following : qrcode, base64, string, pdf</p>

```
GET /api/ticket/:id/:type
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>User Authorization token.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Ticket unique id</p> |
| type | `String` | <p>One of the following : qrcode, base64, string, pdf</p> |

## <a name='Get-tickets-data'></a> Get tickets data
[Back to top](#top)

<p><strong>Access Level :</strong> valid-user admin <br/> To fetch tickets data send <code>GET</code> request to <code>/api/ticket</code> endpoint :</p>

```
GET /api/ticket
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin or Valid user Authorization token.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>Array of tickets data</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "data fetched",
	"data" : [
		{
			"id" : 1,
			"createdAt" : "2023-07-13",
			"bleacherType" : "VIP",
			"gameId" : 1,
			"userId" : 1
		},
		{
			"id" : 2,
			"createdAt" : "2023-05-24",
			"bleacherType" : "EB",
			"gameId" : 3,
			"userId" : 1
		}
	]
}
```

# <a name='User'></a> User

## <a name='Create-User'></a> Create User
[Back to top](#top)

<p>This endpoint allows a user to be created by providing required user data. If successful, the new user data will be returned in the response.</p>

```
POST /api/user
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| firstname | `String` | <p>First name of the user.</p> |
| lastname | `String` | <p>Last name of the user.</p> |
| email | `String` | <p>Email address of the user.</p> |
| password | `String` | <p>Password for the user account.</p> |
| phone | `String` | <p>Phone number of the user.</p> |
| nationalId | `String` | <p>National ID of the user.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>Whether or not the request was successful.</p> |
| code | `Number` | <p>The HTTP status code returned by the server.</p> |
| message | `String` | <p>A message explaining the status of the request.</p> |
| data | `Object` | <p>The data returned by the endpoint.</p> |
| data.id | `Number` | <p>The ID of the newly created user.</p> |
| data.username | `String` | <p>The username of the newly created user.</p> |
| data.firstname | `String` | <p>The first name of the newly created user.</p> |
| data.lastname | `String` | <p>The last name of the newly created user.</p> |
| data.email | `String` | <p>The email address of the newly created user.</p> |
| data.isEmailConfirmed | `Boolean` | <p>Whether or not the user's email address has been confirmed.</p> |
| data.phone | `String` | <p>The phone number of the newly created user.</p> |
| data.nationalId | `String` | <p>The national ID of the newly created user.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201 Created
{
  "success": true,
  "code": 201,
  "message": "User created successfully.",
  "data": {
      "id": 123,
      "username": "johndoe",
      "firstname": "John",
      "lastname": "Doe",
      "email": "johndoe@example.com",
      "isEmailConfirmed": false,
      "phone": "+1234567890",
      "nationalId": "ABC123"
  }
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>Whether or not the request was successful.</p> |
| code | `Number` | <p>The HTTP status code returned by the server.</p> |
| message | `String` | <p>A message explaining the status of the request.</p> |
| field | `String` | <p>The field in which the error occurred.</p> |

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
{
  "success": false,
  "code": 400,
  "message": "Missing required field(s).",
  "field": "email"
}
```

## <a name='Delete-user'></a> Delete user
[Back to top](#top)

<p><strong>Access Level :</strong> user <br/> To delete a user send <code>DELETE</code> request to <code>/api/user</code> endpoint :</p>

```
DELETE /api/user
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>User Authorization token.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The deleted user data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "user deleted",
	"data" : {
		"id" : 1,
		"username" : "test_1",
		"firstname" : "test",
		"lastname" : "test",
		"email" : "example@example.com",
		"isEmailConfirmed" : false,
		"phone" : "+213667667067",
		"nationalId" : "123456789"
	}
}
```

## <a name='Delete-user-by-id'></a> Delete user by id
[Back to top](#top)

<p><strong>Access Level :</strong> admin <br/> to Delete a user send <code>DELETE</code> request to <code>/api/user/:id</code> endpoint where <code>:id</code> is the user unique id :</p>

```
DELETE /api/user/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Admin Authorization token.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>User unique id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The deleted user data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "user deleted",
	"data" : {
		"id" : 1,
		"username" : "test_1",
		"firstname" : "test",
		"lastname" : "test",
		"email" : "example@example.com",
		"isEmailConfirmed" : false,
		"phone" : "+213667667067",
		"nationalId" : "123456789"
	}
}
```

## <a name='Get-user-data-by-id'></a> Get user data by id
[Back to top](#top)

<p><strong>Access Level :</strong> user admin <br/> To fetch user data send <code>GET</code> request to <code>/api/user/:id</code> endpoint where <code>:id</code> is the user id :</p>

```
GET /api/user/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>User or Admin Authorization token.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>User unique id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>User Data</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "data fetched",
	"data" : {
		"id" : 1,
		"username" : "test_1",
		"firstname" : "test",
		"lastname" : "test",
		"email" : "example@example.com",
		"isEmailConfirmed" : true,
		"phone" : "+213667667067",
		"nationalId" : "123456789"
	}
}
```

## <a name='Get-User-Information'></a> Get User Information
[Back to top](#top)

<p>This endpoint returns the user information or an array of users based on the access token provided.</p> <p>If an admin access token is provided, an array of users can be fetched and pagination and filtering can be applied. If a user access token is provided, only the user's information is returned.</p>

```
GET /api/user
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Bearer access token.</p> |

### Query Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| page | `Number` | **optional** <p>Page number for pagination (admin only).</p>_Default value: 1_<br> |
| limit | `Number` | **optional** <p>Number of users to fetch per page (admin only).</p>_Default value: 20_<br> |
| id | `Number` | **optional** <p>Filter users by user ID (admin only).</p> |
| email | `String` | **optional** <p>Filter users by email address (admin only).</p> |
| isEmailConfirmed | `Number` | **optional** <p>Filter users by email confirmation status (admin only).</p> |
| count | `Boolean` | **optional** <p>If set to true, returns the number of users matching the specified filters (admin only).</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>Indicates whether the request was successful.</p> |
| code | `Number` | <p>HTTP status code for the response.</p> |
| message | `String` | <p>A message indicating the result of the request.</p> |
| data | `Object|Array` | <p>The user information or array of users.</p> |

### Success response example

#### Success response example - `Successful Response (Admin):`

```json
HTTP/1.1 200 OK
{
    "success": true,
    "code": 200,
    "message": "Users fetched successfully.",
    "data": [
        {
            "id": 1,
            "username": "user1",
            "firstname": "John",
            "lastname": "Doe",
            "email": "johndoe@example.com",
            "isEmailConfirmed": false,
            "phone": "555-1234",
            "nationalId": "1234567890"
        },
        {
            "id": 2,
            "username": "user2",
            "firstname": "Jane",
            "lastname": "Doe",
            "email": "janedoe@example.com",
            "isEmailConfirmed": true,
            "phone": "555-5678",
            "nationalId": "0987654321"
        }
    ]
}
```

#### Success response example - `Successful Response (User):`

```json
HTTP/1.1 200 OK
{
    "success": true,
    "code": 200,
    "message": "User fetched successfully.",
    "data": {
        "id": 1,
        "username": "user1",
        "firstname": "John",
        "lastname": "Doe",
        "email": "johndoe@example.com",
        "isEmailConfirmed": false,
        "phone": "555-1234",
        "nationalId": "1234567890"
    }
}
```

### Error response example

#### Error response example - `Error Response:`

```json
HTTP/1.1 401 Unauthorized
{
    "success": false,
    "code": 401,
    "message": "Authorization failed. Access token invalid or expired.",
    "data": null
}
```

## <a name='Receive-email-confirmation'></a> Receive email confirmation
[Back to top](#top)

<p><strong>Access Level :</strong> visitor <br/> You probably don't need to deal with this endpoint, and probably you will get an error if you don't have the exact same link sent to the user email</p>

```
GET /api/user/receive/confirmation/email/:token
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>Unique token</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 202,
	"message" : "email confirmed",
	"data" : {}
}
```

## <a name='Send-a-confirmation-email'></a> Send a confirmation email
[Back to top](#top)

<p><strong>Access Level :</strong> user <br/> Send a unique url to the user email, when the user clicks the link his email will be confirmed</p>

```
GET /api/user/send/confirmation/email
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>User Authorization token.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "email has been sent",
	"data" : {}
}
```

## <a name='Update-user'></a> Update user
[Back to top](#top)

<p><strong>Access Level :</strong> user <br/> To update the user data send <code>PUT</code> request to <code>/api/user</code> endpoint, make sure to include the data you want to modify in the request body :</p>

```
PUT /api/user
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>User Authorization token.</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| firstname | `String` | **optional** <p>first name</p> |
| lastname | `String` | **optional** <p>last name</p> |
| email | `String` | **optional** <p>email</p> |
| password | `String` | **optional** <p>password</p> |
| phone | `String` | **optional** <p>phone number</p> |
| nationalId | `String` | **optional** <p>national Id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Data | `Object` | <p>The updated user data.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	"success" : true,
	"code" : 200,
	"message" : "user updated",
	"data" : {
		"id" : 1,
		"username" : "test_1",
		"firstname" : "test",
		"lastname" : "test",
		"email" : "example@example.com",
		"isEmailConfirmed" : false,
		"phone" : "+213667667067",
		"nationalId" : "123456789"
	}
}
```

## <a name='User-login'></a> User login
[Back to top](#top)

<p>This endpoint allows a user to log in by providing their email and password. If the provided credentials are correct, the server will return an access token which the user can use to authenticate future requests.</p>

```
POST /api/user/login
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| email | `String` | <p>User email.</p> |
| password | `String` | <p>User password.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>Whether or not the request was successful.</p> |
| code | `Number` | <p>The HTTP status code returned by the server.</p> |
| message | `String` | <p>A message explaining the status of the request.</p> |
| data | `Object` | <p>The data returned by the endpoint.</p> |
| data.token | `String` | <p>Access token for the authenticated user.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
  "success": true,
  "code": 200,
  "message": "User authenticated successfully.",
  "data": {
      "token": "ACCESS_TOKEN"
  }
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>Whether or not the request was successful.</p> |
| code | `Number` | <p>The HTTP status code returned by the server.</p> |
| message | `String` | <p>A message explaining the status of the request.</p> |
| field | `String` | <p>The field in which the error occurred.</p> |

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 401 Unauthorized
{
  "success": false,
  "code": 401,
  "message": "Invalid email or password.",
  "field": "email"
}
```


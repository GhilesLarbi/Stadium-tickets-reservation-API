---
title: Stadium Tickets Reservation API Documentation
---
# Stadium Tickets Reservation API
## Technologies
- __Server:__ Node.js (express)
- __Database:__ Mariadb (sequelize)
- __Authentication:__ JWT
- __Encryption:__ Bcrypt
- __Restriction:__ Cors
- __Payment:__ Stripe API
- __Email:__ Nodemailer
- __QR code:__ qrcode package
- __PDF:__ pdfkit package


## Features
- Authentication && Authorization
- Pseudo Restful API
- Query searchs
- Generate QR codes
- Create PDF files
- Confirm users emails
- Serve && upload images 

<hr />

# Quick access 
- [Installation](#Installation)
- [Authentication](#Authentication)
- [Response Template](#Response-Template)
- [Authorization](#Authorization)
- [Query](#Query)
- [Pagination](#Pagination)
- [Endpoints](#Endpoints)


<hr />

# Installation
To run the API locally you need to install :
- Node.js +v18.13.0
- Mariadb +v10.6.11

Clone this repository to your local machine 
```bash
git clone https://github.com/GhilesLarbi/Stadium-tickets-reservation-API.git
```

Change directory to the repository folder
```bash
cd Stadium-tickets-reservation-API
```

Install dependencies
```bash 
npm install
```

Start and configure your mariadb server and make sure the user have the `READ` and the `WRITE` privileges 
Then create an empty database
for example `db_test` :
``` sql 
CREATE DATABASE db_test;
```

Add your mariadb server credentials to the `.env` file located in the repository folder :
```javascript
DB_HOST = 127.0.0.1
DB_PORT = 3306
DB_USER = root // mariadb username
DB_PASSWORD = root // mariadb password
DB_NAME = db_test // database name
```

Now seed the database :
```bash
npm run seed-database
```
This command will create the right tables and seed them with dummy data

Finally, you can start the server and listen to requests by executing eather the dev command :
```bash
npm run dev
```
or the normal one :
```bash
npm start
```

By default the server will start on `PORT` 3000.
You can change the default port by adding `PORT` variable to `.env` file :
```javascript
PORT = 8080
```

<hr />

# Authentication
Some endpoints may require authentication for example to fetch your tickets data, you need to [login](#User##login) your API client as a user and obtain an access token.

The endpoints that require authentication expect a bearer token sent in the `Authorizarion header`

__Example:__

Fetch all your tickets 
```http
GET /api/ticket
Authorization: Bearer ACCESS_TOKEN
```

If you don't include the `Authorization header` you will get a `401` status code with a response like this :
```json 
{
    "success" : false,
    "code" : 401,
    "message" : "you are not leged in",
    "field" : "token"
}
```


To get an access token you have to login as a [User](#User##Login) or as an [Admin](#Admin##Login)



<hr />

# Response Template
When you send a request, the server will respond with json data, all responses have a similar format 
For example when sendeing :
```http
GET /api/team/1
```

The response may look like this :
```json
{
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
```

### __`success` :__
represents the response state, if it is true then everything ran as expected, false if something went wrong 
For example if the `id` on the request is not found you may get :
```http 
GET /api/team/1928
```
```json
{
    "success" : false,
    "code" : 404,
    "message" : "team not found",
    "field" : "teamId"
}
```



### __`code` :__ 
is the response status code 
Here are some status codes that you might see a lot : 

`200` : `everything ok`
`201` : `created`
`202` : `accepted`
`204` : `no content`

`400` : `bad request`
`401` : `unautorized`
`402` : `payement required`
`403` : `forbidden`
`404` : `not found`
`405` : `method not allowd`
`406` : `not acceptable`

`500` : `internal server error`
`501` : `not implemented`



### __`message` :__ 
sometimes the status code alone cannot explain what happened exactly on the server, you can read this message instead


### __`data` :__
It's the actual data fetched from the server, this field is not always filled for example when error occurs or sending an email to confirm or uploading a logo you get an empty object, or when you try to fetch users with wrong pagination queries, you get an empty array


### __`field` :__
When an error occurs this field will be included on the response object, from here you can exactly know where you missed up


<hr />

# Authorization
Some endpoints have specific access level, meaning that if you try to access that endpoint with a non-authorized client you will get an error
For example if you try to create a team with a `user token` you will get :
```json
{
    "success" : false,
    "code" : 401,
    "message" : "you are not authorized",
    "field" : "token"
}
```

From now on each endpoint will be marked with an access level defining which client have access to that endpoint 
There are 4 different clients :
- #### `visitor`
is a client without any access token 

- #### `user`
is a client with a `user token` and a non confirmed email 

- #### `valid-user`
is a client with a `user token` and a confirmed email 

- #### `admin`
is a client with an `admin token`


<hr />

# Query


<hr />

# Pagination


<hr />


# Endpoints
- [ADMIN](#Admin)
    - [Login](#Admin##Login)
- [USER](#User)
    - [login](#User##Login)
    - [create new user](#User##Create-new-user)
    - [get user data](##Get-user-data)


<hr />

# Admin
## Login 
__access level: __#visitor 

To login as an admin send a `POST` request to `/api/admin/login` endpoint :
```http
POST /api/admin/login
```

You have to include the admin credentials in the request `body` using `json` format :
```json
{
    "user" : "ADMIN_USERNAME",
    "password" : "ADMIN_PASSWORD"
}
```

The expect response looks like this :
```json
{
    "data" : {
        "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6bnVsbCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjc3ODkzMjcwfQ.Dn9YYg7V1FIMAGg_2M6RDPon_nu6fUdsMQQ3eW_E2mk"
    }
}
```

If you give wrong credentials you may get a `401` status code with a response like this :
```json 
{
    "success" : false,
    "code" : 401,
    "message" : "Wrong password",
    "field" : "password"
}
```
See more about [response template](#Response-Template) to learn about the expect response format


<hr />

# User
## Login 
__access level :__ #visitor 

To login as a user send a `POST` request to `/api/user/login` endpoint :
```http
POST /api/user/login
```

You have to include the user credentials in the request `body` using `json` format :
```json
{
    "email" : "YOUR_EMAIL",
    "password" : "YOUR_PASSWORD"
}
```

The expect response looks like this :
```json
{
    ​​​"data" : {
        "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6bnVsbCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjc3ODkzMjcwfQ.Dn9YYg7V1FIMAGg_2M6RDPon_nu6fUdsMQQ3eW_E2mk"
    }
}
```


## Create new user 
__access level : __ #visitor 

To create a user send a `POST` request to `/api/user` endpoint :
```http
POST /api/user
```

You have to include these parameters in the request `body` using `json` format :

```json
{
    "firstname" : "test",
    "lastname" : "test",
    "email" : "test@test.com",
    "password" : "123",
    "phone" : "+213667667067",
    "nationalNumber" : "123456789"
}
```

if you omit a parameter you will get `406` `not acceptable` status code :
```json
{
    "success" : false,
    "code" : 406,
    "message" : "firstname cannot be null",
    "field" : "firstname"
}
```

if you use an email or a phone number that already exist you will get a `406` `not acceptable` status code :

```json 
{
    "success" : false,
    "code" : 406,
    "message" : "email must be unique",
    "field" : "email"
}
```


if everything goes well you will get :
```javascript
{
    "success" : true,
    "code" : 201,
    "message" : "user created",
    "data" : {
        // the new user datat
    }
}
```

## Get user data
__access level : __ #user #admin

To get the user data send a `GET` request to `/api/user` endpoint, you have to include the `access token` in the `authorization header`

```http
GET /api/user
```

You will get different results based on the `access token` included in the `authorization header`. If you are using the `user token`, you will only get the data related to that user :
```json 
{
    "data" : {
        "id" : 1,
        "username" : "test_1",
        "firstname" : "test",
        "lastname" : "test",
        "email" : "test@test.com",
        "phone" : "+216667667067",
        "isEmailConfirmed" : false,
    }
}
```

if you use the `admin token`, you will get an array of all users data :
```json
{
    "results" : 2,
    "data" : [
        {
            "id" : 1,
        },
        {
            "id" : 2,
        }
    ]
}
```

You can preform a pagination query
see more about [pagination](#Pagination)
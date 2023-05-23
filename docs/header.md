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


To successfully install and run the API locally, please follow the steps outlined below:

Step 1: Install Dependencies

Before proceeding, ensure that you have the following software installed on your machine:

- Node.js +v18.13.0
- Choose either MariaDB or MySQL based on your preference.

If you choose MariaDB:

1. Install MariaDB on your machine. You can download it from the official MariaDB website and follow the installation instructions for your operating system.

2. Install the MariaDB module by running the following command:

```bash
npm install mariadb
```

If you choose MySQL:

1. Install MySQL on your machine. You can download it from the official MySQL website and follow the installation instructions for your operating system.

2. Install the MySQL module by running the following command:

```bash
npm install mysql
```

Step 2: Clone the Repository

Open your terminal and clone the repository to your local machine by executing the following command:

```bash
git clone https://github.com/GhilesLarbi/Stadium-tickets-reservation-API.git
```

Navigate to the cloned repository by running the command:

```bash
cd Stadium-tickets-reservation-API
```

Step 3: Install Nodemon

To enable a development environment, install the nodemon package by executing the following command:

```bash
npm install nodemon --save-dev
```

Step 4: Install Dependencies

Install the required dependencies by running the following command:

```bash
npm install
```

If you encounter any issues during the installation process, make sure to resolve them before proceeding.

Step 5: Set up Environment Variables

Open the `.env` file located in the repository folder on your local machine. Update the file to include the following variables:

- Database configuration:
  - `DB_TYPE`: Set this variable to either "mariadb" or "mysql" based on your chosen database system.
  - `DB_HOST`: The host address of your database server.
  - `DB_PORT`: The port number on which your database server is running.
  - `DB_USER`: The username to access your database server.
  - `DB_PASSWORD`: The password to access your database server.
  - `DB_NAME`: The name of the database you want to use.

- Stripe credentials:
  - `STRIPE_TOKEN`: The token generated from your Stripe account.

- Email configuration:
  - `EMAIL`: Your email address to send emails from.
  - `EMAIL_PASSWORD`: The password for your email address.

- API configuration:
  - `API_URL`: The preferred URL path for accessing the API, usually set as "/api".

- Token and password encryption:
  - `TOKEN_ENCRYPTION_KEY`: The encryption key used to encrypt JWT tokens and passwords using bcrypt.

- Ticket QR code encryption:
  - `ENCRYPTION_KEY`: The encryption key used to encrypt the ticket QR code string.
  - `ENCRYPTION_INIT_VECTOR`: The initialization vector used for encryption of the ticket QR code string.

Make sure to save the changes made to the `.env` file.

Step 6: Seed the Database

To populate the database with the necessary tables and dummy data, execute the following command in your terminal:

```bash
npm run seed-database
```

Step 7: Start the Server

You are now ready to start the server and listen to incoming requests. In your terminal, execute either of the following commands:

```bash
npm run dev
```

or

```bash
npm start
```

This will initiate the server and allow it to respond to client requests accordingly.

By default, the server will start on PORT 3000. If you wish to change the port, you can add a `PORT` variable to the `.env` file.


<hr />


# Authentication
Authentication is needed to access certain endpoints in the API, such as fetching your ticket data. To do this, you need to log in as a user and get an `access token`.

When accessing endpoints that require authentication, you should include your access token in the `Authorization header` as a `Bearer token`.

For example, to fetch all of your tickets, you would send a `GET` request to `/api/ticket` with your access token included in the `Authorization header` as follows:

```
Authorization: Bearer ACCESS_TOKEN
```

Make sure to replace ACCESS_TOKEN with your actual access token.



If the header is missing or invalid, the server will respond with a `401` status code and an error message indicating that you are not authorized to access the resource.

For example, if you attempt to fetch your tickets without a valid access token, the server will return a response similar to the following:

```json

{
    "success" : false,
    "code" : 401,
    "message" : "Authentication failed. Please provide a valid token.",
    "field" : "Authorization"
}
```

To obtain an `access token`, you must first log in as a user or an admin, depending on the authentication requirements of the API. Once you have a valid token, include it in the `Authorization header` of your requests to access protected resources.


<hr />

# Response Template

To maintain consistency across all API responses, the server follows a specific format. Whenever you send a request, the server will respond with `JSON` data in this standardized format.

For example, when you send a request to fetch data about a specific team, let's say `JSK`, the response may look like this:

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




In response to your requests, the server will reply with JSON data that follows a similar format. Each response includes the following fields:

### __`success` :__
indicates the status of the response. A value of true means that everything went smoothly, while a value of false means that something went wrong. For example, if you request an invalid ID, the response may be:

```json

{
    "success" : false,
    "code" : 404,
    "message" : "team not found",
    "field" : "teamId"
}
```


### __`code` :__ 
is the HTTP status code of the response. Some commonly used codes include:

`200` : `everything ok` <br/>
`201` : `created` <br/>
`202` : `accepted` <br/>
`204` : `no content` <br/>

`400` : `bad request` <br/>
`401` : `unautorized` <br/>
`402` : `payement required` <br/>
`403` : `forbidden` <br/>
`404` : `not found` <br/>
`405` : `method not allowd` <br/>
`406` : `not acceptable` <br/>

`500` : `internal server error` <br/>
`501` : `not implemented` <br/>



### __`message` :__ 
is a human-readable string that provides additional context about the response.


### __`data` :__
is the payload of the response, which contains the requested data

Note that the format of the response may vary depending on the specific endpoint being accessed.


### __`field` :__
This field is included in the response object when an error occurs. It provides information about the specific field that caused the error, allowing you to easily identify and correct the mistake. For example, if you provide an invalid `teamId` in a request, the response might include the following:

```json

{
    "success": false,
    "code": 400,
    "message": "Bad request",
    "field": "teamId"
}
```

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


Pagination is a feature supported by some endpoints that allows you to limit the number of results returned and navigate through them using the page query. For example, if you want to fetch users using an admin token, by default, you will get the first 20 users:

```http
GET /api/user
```

If you want to fetch the next page of users, you can include the page query:

```http
GET /api/user/?page=2
```

This will return the next 20 users, starting from 21 to 40.

You can also include the limit query to change the number of results returned per page:

```http
GET /api/user/?limit=10&page=2
```

This will return an array of 10 users, starting from 11 to 20.

### Pagination is supported by the following endpoints:
- [get user data](##get-user-data)
- [get leagues data](##get-leagues-data)
- [get teams data](##get-teams-data)
- [get games data](##get-games-data)

<hr />

const express = require('express')
const app = express()

const cors = require('cors')

const path = require('path')
const API = process.env.API_URL

const notFoundErrorHandler = require('../middlewares/notFoundErrorHandler')
const globalErrorHandler = require('../middlewares/globalErrorHandler')


// Middlewares

// ---- development purposes ----
// logging requests
// const morgan = require('morgan')
// app.use(morgan('dev'))

// alow external access
app.use(cors( {
	origin: ["https://ghileslarbi.github.io", '*'],
	credentials: true,
}))

// parse incomming data to json
app.use(express.json())

// serve images
app.use(`${API}/images`, express.static(path.join(__dirname + '/../images/')));


// SKETCHY-CODE
// USE A FOR LOOP TO IMPORT AND USE API ROUTERS

// import api routers
const adminRouter = require('../api/routers/admin.router')
const userRouter = require('../api/routers/user.router')
const bleacherRouter = require('../api/routers/bleacher.router')
const leagueRouter = require('../api/routers/league.router')
const teamRouter = require('../api/routers/team.router')
const gameRouter = require('../api/routers/game.router')
const ticketRouter = require('../api/routers/ticket.router')

// use api routers
app.use(`${API}/admin`, adminRouter)
app.use(`${API}/user`, userRouter)
app.use(`${API}/bleacher`, bleacherRouter)
app.use(`${API}/league`, leagueRouter)
app.use(`${API}/team`, teamRouter)
app.use(`${API}/game`, gameRouter)
app.use(`${API}/ticket`, ticketRouter)

// error middlewares
app.use(notFoundErrorHandler)
app.use(globalErrorHandler)

module.exports = app
const express = require('express')
const app = express()

const path = require('path')

const API = process.env.API_URL

const notFoundErrorHandler = require('../middlewares/notFoundErrorHandler')
const globalErrorHandler = require('../middlewares/globalErrorHandler')


// Middlewares

// ---- development purposes ----
// logging requests
const morgan = require('morgan')
app.use(morgan('dev'))

// parse incomming data to json
app.use(express.json())

// serve images
app.use('/api/images', express.static(path.join(__dirname + '/../images/')));


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
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)
app.use('/api/bleacher', bleacherRouter)
app.use('/api/league', leagueRouter)
app.use('/api/team', teamRouter)
app.use('/api/game', gameRouter)
app.use('/api/ticket', ticketRouter)

// error middlewares
app.use(notFoundErrorHandler)
app.use(globalErrorHandler)

module.exports = app
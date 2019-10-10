const express = require('express')
const bodyParser = require('body-parser')
const date = require('date-and-time')
const path = require('path')
const mongoose = require('mongoose')

// Connect to the DB
require('../config/db')()

// Initialize application
const app = express()

// stops a deprecation warning from occuring when making a mongodb call
mongoose.set('useFindAndModify', false);

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use routes
app.use('/api/auth', require('../routes/api/auth'))
app.use('/api/fantasyTeams', require('../routes/api/fantasyTeams'))
app.use('/api/league', require('../routes/api/league'))
app.use('/api/users', require('../routes/api/users'))
app.use('/stats/players', require('../routes/stats/players'))
app.use('/stats/teams', require('../routes/stats/teams'))

const PORT = process.env.PORT || 5000
app.set(PORT, () => {
    console.log(`[${date.format(new Date(), 'hh:mm:ss')}] Node.js Testing Server running on port: ${PORT}`)
})

module.exports = { app }
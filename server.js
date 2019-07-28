const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const date = require('date-and-time')
const axios = require('axios')
const path = require('path')

// Routes
const test = require('./routes/api/test')
const games = require('./routes/stats/games')

// Initialize application
const app = express()

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// React Middleware
app.use(express.static(path.join(__dirname, '/client/build')))

// Passport Middleware
app.use(passport.initialize())

// GET THIS SHIT DONE WHEN YOU SET UP DEV ENV
// Passport Config
//require('./config/passport')(passport)

// use routes
app.use('/api/test', test)
app.use('/stats/games', games)
app.use('/stats/players', games)

// Connect to Front end
//app.get("*", (req, res) => {
//    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//});

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`[${date.format(new Date(), 'hh:mm:ss')}] Server running on port: ${PORT}`)
})

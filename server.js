const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const date = require('date-and-time')
const axios = require('axios')

// Routes
const test = require('./routes/api/test')

// Initialize application
const app = express()

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Passport Middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// use routes
app.use('/api/test', test)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`[${date.format(new Date(), 'hh:mm:ss')}] Server running on port: ${PORT}`)
})

// axios.get(`${keys.NBAAPIURL}/games/date/2019-04-14`, keys.config)
//   .then(res => console.log(JSON.stringify(res.data, undefined, 2)))
//   .catch(err => console.log(err))

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const date = require('date-and-time')
const axios = require('axios')

const NBA = require('./config/nbaApi')

// Routes
const test = require('./routes/api/test')

// Initialize application
const app = express()

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Passport Middleware
app.use(passport.initialize())

// GET THIS SHIT DONE WHEN YOU SET UP DEV ENV
// Passport Config
//require('./config/passport')(passport)

// use routes
app.use('/api/test', test)

app.get('/', (req, res) => {
  res.send('<h1>ESPN Sucks. Heres a better NBA Fantasy league</h1>')
})

app.get('/games/today', (req, res) => {
  res.send()
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`[${date.format(new Date(), 'hh:mm:ss')}] Server running on port: ${PORT}`)
})

const express = require('express')
const bodyParser = require('body-parser')
const date = require('date-and-time')
const path = require('path')

// Connect to the DB
require('./config/db')()

// Initialize application
const app = express()

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// React Middleware
app.use(express.static(path.join(__dirname, '/client/build')))

// use routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/league', require('./routes/api/league'))
app.use('/api/users', require('./routes/api/users'))
app.use('/stats/players', require('./routes/stats/players'))
app.use('/stats/teams', require('./routes/stats/teams'))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`[${date.format(new Date(), 'hh:mm:ss')}] Node.js Server running on port: ${PORT}`)
})

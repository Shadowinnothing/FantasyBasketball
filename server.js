const express = require('express')
const bodyParser = require('body-parser')
const date = require('date-and-time')
const path = require('path')
const mongoose = require('mongoose')

// Used to make graphql require an jwt to hit
//const auth = require('./middleware/auth')

// Connect to the DB
require('./config/db')()

// Initialize application
const app = express()

// stops a deprecation warning from occuring when making a mongodb call
mongoose.set('useFindAndModify', false);

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// React Middleware
app.use(express.static(path.join(__dirname, '/client/build')))

// Fix for app crashing on refresh
// "cannot GET /playerSearch" error"
// app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

// use routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/contracts', require('./routes/api/contracts'))
app.use('/api/fantasyScoring', require('./routes/api/fantasyScoring'))
app.use('/api/fantasyTeams', require('./routes/api/fantasyTeams'))
app.use('/api/league', require('./routes/api/league'))
app.use('/api/users', require('./routes/api/users'))
app.use('/stats/players', require('./routes/stats/players'))
app.use('/stats/teams', require('./routes/stats/teams'))
app.use('/graphql', require('./routes/graphql'))

// Server has to be running to run player salary script
//require('./middleware/fantasy/saveAllPlayerSalariesToDB')
//console.log('[*CAUTION*]: saveAllPlayerSalariesToDB is about to be run!!!')

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`[${date.format(new Date(), 'hh:mm:ss')}] Node.js Server running on port: ${PORT}`)
})

module.exports = { app }
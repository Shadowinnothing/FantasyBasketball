const express = require('express')
const expressGraphQL = require('express-graphql')
const bodyParser = require('body-parser')
const date = require('date-and-time')
const path = require('path')
const mongoose = require('mongoose')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

// graphql schema
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'helloworld',
        fields: () => ({
            message: { type: GraphQLString, resolve: () => 'Hello World' },
            yeet: { type: GraphQLString, resolve: () => 'Another one' },
        })
    })
})

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

// Create graphql server
app.use('/graphql', expressGraphQL({
    graphiql: true, // <- create the graphQL playground
    schema
}))

// Fix for app crashing on refresh
// "cannot GET /playerSearch" error"
// app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

// use routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/contracts', require('./routes/api/contracts'))
app.use('/api/fantasyTeams', require('./routes/api/fantasyTeams'))
app.use('/api/league', require('./routes/api/league'))
app.use('/api/users', require('./routes/api/users'))
app.use('/stats/players', require('./routes/stats/players'))
app.use('/stats/teams', require('./routes/stats/teams'))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`[${date.format(new Date(), 'hh:mm:ss')}] Node.js Server running on port: ${PORT}`)
})

module.exports = { app }
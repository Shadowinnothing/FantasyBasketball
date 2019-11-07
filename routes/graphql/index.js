const graphqlHTTP = require('express-graphql')

const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')

console.log(`GraphQL Server running on /graphql`)

module.exports = new graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true
})

// GraphQL Yoga
// I'm scrapping all of this for now because graphql-yoga sits on top of express and I cannot have 2 express servers running at once
// without messing with the proxy settings on the client side. Rather than do that I'm sticking with express-graphql
// to make it so I only have to proxy 1 api

//const { GraphQLServer } = require('graphql-yoga')

// Initialize graphql server
// const graphqlServer = new GraphQLServer({
//     typeDefs, resolvers
// })

// const graphqlOptions = {
//     port: 5000,
//     endpoint: '/graphql',
//     subscriptions: '/subscriptions',
//     playground: '/playground'
// }

// graphqlServer.start(graphqlOptions, ({ port }) => {
//     console.log(`[${date.format(new Date(), 'hh:mm:ss')}] GraphQL Server running on port: ${port}`)
// })
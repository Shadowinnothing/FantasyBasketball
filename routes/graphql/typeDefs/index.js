const { buildSchema } = require('graphql');

// Type Definitions (Schema)
const typeDefs = buildSchema(`
    type Query {
        hello: String
        dreesen: String
        test: Boolean
    }
`)

module.exports = typeDefs
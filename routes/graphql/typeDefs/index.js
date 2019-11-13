const { buildSchema } = require('graphql');

// Type Definitions (Schema)
const typeDefs = buildSchema(`
    type Query {
        hello: String
        dreesen: String
        test: Boolean

        player(id: Int!): Player
        players(id: [ Int ]): [ Player ]
        allPlayers: [ Player ]
    }

    type TeamData {
        city: String,
        fullName: String,
        nickName: String,
        shortName: String
    }

    type Player {
        firstName: String,
        lastName: String,
        teamId: String,
        yearsPro: String,
        collegeName: String,
        country: String,
        playerId: String,
        dateOfBirth: String,
        affiliation: String,
        startNba: String,
        heightInMeters: String,
        weightInKilograms: String
        teamData: TeamData
    }
`)

module.exports = typeDefs
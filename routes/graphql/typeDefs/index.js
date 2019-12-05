const { buildSchema } = require('graphql');

// Type Definitions (Schema)
const typeDefs = buildSchema(`
    type Query {
        allPlayers: [ Player ]

        playerLastGameData(playerId: Int!): GameDataPlayer
        playerGameDataByGameId(playerId: Int!, gameId: Int!): GameDataPlayer
    
        allNBAGamesByDate(date: String!): [ GameDataSchedule ]

        teamScores(id: [ Int! ]): [ GameDataPlayer ]
    }

    type TeamData {
        city: String
        fullName: String
        nickName: String
        shortName: String
    }

    type Player {
        firstName: String
        lastName: String
        teamId: String
        yearsPro: String
        collegeName: String
        country: String
        playerId: String
        dateOfBirth: String
        affiliation: String
        startNba: String
        heightInMeters: String
        weightInKilograms: String
        teamData: TeamData
        playerPrice: Int
    }

    type GameDataPlayer {
        points: Int
        assists: Int
        offensiveRebounds: Int
        defensiveRebounds: Int
        totalRebounds: Int
        blocks: Int
        steals: Int
        minutes: String
        fgm: Int
        fga: Int
        ftm: Int
        fta: Int
        personalFouls: Int
        turnovers: Int
    }

    type GameDataSchedule {
        gameId: Int
        startTime: Float
        endTime: Float
        city: String
        statusGame: String
        awayTeam: TeamData
        homeTeam: TeamData
        awayTeamScore: Int
        homeTeamScore: Int
    }
`)

module.exports = typeDefs
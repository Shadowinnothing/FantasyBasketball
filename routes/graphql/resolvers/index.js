// If I ever need to connect the db to graphql
//const { MongoClient, ObjectId } = require('mongodb')

//const calculateFantasySalary = require('../../../middleware/fantasy/calculateFantasySalary')
const nba = require('../../../apis/nba')

const allPlayersResolver = require('./NBAPlayers/allPlayers')

const playerLastGameDataResolver = require('./NBAPlayers/playerLastGameData')
const playerGameDataByGameIdResolver = require('./NBAPlayers/playerGameDataByGameId')
const allNBAGamesByDateResolver = require('./NBASchedule/allNBAGamesByDate')

// Resolvers (functions to run various actions)
const rootResolvers = {
    allPlayers: allPlayersResolver(nba),
    playerLastGameData: playerObj => playerLastGameDataResolver(playerObj, nba),
    playerGameDataByGameId: playerObj => playerGameDataByGameIdResolver(playerObj, nba),
    allNBAGamesByDate: playerObj => allNBAGamesByDateResolver(playerObj, nba)
}

module.exports = rootResolvers
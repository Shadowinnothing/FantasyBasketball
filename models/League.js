// Model of a fantasy league
const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const FantasyLeagueSettings = require('./LeagueSettings')

const LeagueSchema = new Schema({
    leagueName: {
        type: String,
        required: true
    },
    leagueType: {
        type: String,
        required: true
    },
    leagueCreationDate: {
        type: Date,
        default: Date.now()
    },
    leagueNote: {
        type: String
    },
    teamOwners: {
        type: []
    },
    leagueSettings: {
        type: FantasyLeagueSettings
    }
})

module.exports = League = mongoose.model('leagues', LeagueSchema)

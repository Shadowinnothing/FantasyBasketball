// Model of a fantasy league
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create User Schema
const LeagueSchema = new Schema({
    leagueName: {
        type: String,
        required: true
    },
    leagueCreationDate: {
        type: Date,
        default: Date.now()
    },
    leagueSetting: {
        type: String // <- For sure the WRONG type, ganna investigate this
    },
    leagueNote: {
        type: String // <- note posted on league page from league admin
    },
    teams: {
        type: [ Number ] // <- teamIds
    }
})

module.exports = League = mongoose.model('leagues', LeagueSchema)

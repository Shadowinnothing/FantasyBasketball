// Model of a fantasy team
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create User Schema
const FantasyTeamSchema = new Schema({
    teamName: {
        type: String,
        required: true
    },
    teamOwner: {
        type: String,
        required: true // userId
    },
    players: {
        type: [ Number ]
    },
    leagueId: {
        type: String,
        required: true
    },
    isManager: {
        type: Boolean,
        default: false
    }
})

module.exports = Team = mongoose.model('teams', FantasyTeamSchema)

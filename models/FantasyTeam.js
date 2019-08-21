// Model of a fantasy team
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create User Schema
const FantasyTeamSchema = new Schema({
    teamName: {
        type: String,
        required: true
    },
    players: {
        type: [ Number ]
    },
    leagueId: {
        type: Number,
        required: true
    }
})

module.exports = Team = mongoose.model('teams', FantasyTeamSchema)

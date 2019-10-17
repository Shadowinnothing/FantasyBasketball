// Model of a fantasy team
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create User Schema
const FantasyTeamSchema = new Schema({
    teamName: {
        type: String,
        required: true,
        default: 'Default Team Name'
    },
    teamNickname: {
        type: String, 
        required: true,
        default: 'Team'
    },
    teamLogo: {
        type: String,
        default: 'https://imgur.com/r/nba/LgaCP'
    },
    teamOwner: {
        type: String,
        required: true // userId
    },
    players: {
        type: [ Number ],
        default: []
    },
    draftPicks: {
        type: [ Number ],
        default: []
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

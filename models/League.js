// Model of a fantasy league
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Parameters of the League Schema:
    // leagueName
        // Name of the league ex. Nikola Jokic 2020 MVP Hypetrain
    // leagueType
        // The style of league this is either daily fantasy, standard mode, dynasty mode
    // leagueCreationDate
        // Date the league was created
    // leagueManagers
        // Array of teamId's of users able to edit the league settings
        // INITIAL CREATION OF THIS WILL BE A SINGLE USER ID PLACED IN AN ARRAY
    // league settings
        // Model of settings for a league. Scoring, draftDate, draftOrder, etc.
    // leagueNote
        // Note posted on leaguePage ex. Date of draft, keepers, etc.
    // teamOwners
        // Array of userId's that are eligable to create/edit a team for the given league    

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
    leagueManagers: {
        type: [ String ],
        required: true
    },
    leagueSetting: {
        type: String
    },
    leagueNote: {
        type: String
    },
    teamOwners: {
        type: [ Number ]
    }
})

module.exports = League = mongoose.model('leagues', LeagueSchema)

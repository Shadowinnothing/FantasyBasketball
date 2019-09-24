// Model of fantasy League settings
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FantasyLeagueSettings = new Schema({
    divisions: {
        numberOfDivisions: { type: Number, default: 2 },
        divisionNames: { type: [String], default: ['East', 'West'] } 
    },
    draft: {
        draftTime: { type: Date, default: '2019-10-20T04:45:00.000Z' },
        draftType: { // Snake, Auction, Offline(leagueManager inputs teams?)
            type: String,
            default: 'SNAKE',
            required: true
        }
    },
    generalSettings: {
        numberOfTeams: { // between 4 and 20
            type: Number,
            default: 12,
            required: true
        },
    },
    keepers: {
        enableKeepers: { type: Boolean, default: false },
        numberOfKeepers: { type: Number, default: 0 }
    },
    roster: {
        maxRosterSize: { type: Number, default: 15 },
        positionMax: {
            PG: { type: Number },
            SG: { type: Number },
            SF: { type: Number },
            PF: { type: Number },
            C:  { type: Number }
        },
        starters: { type: Number, default: 10 },
        irSlots: { type: Number, default: 2 }
    },
    schedule: {
        numberOfWeeks: { type: Number, default: 18 },
        numberOfPlayoffRounds: { type: Number, default: 2 },
        numberOfPlayoffTeams: { type: Number, default: 4 },
        tieBreaker: { type: String, default: 'BENCH_POINTS' }
    },
    scoring: {
        // points or categories
        scoringType: { type: String, default: 'POINTS' },
        pointValues: {
            points: { type: Number, default: 1 },
            rebounds: { type: Number, default: 1.5 },
            assists: { type: Number, default: 2 },
            steals: { type: Number, default: 2.5 },
            blocks: { type: Number, default: 2.5 }
        },
        categoryValues: {
            points: { type: Boolean, default: false },
            rebounds: { type: Boolean, default: false },
            assists: { type: Boolean, default: false },
            steals: { type: Boolean, default: false },
            blocks: { type: Boolean, default: false }
        }
    }
})

module.exports = FantasyLeagueSettings
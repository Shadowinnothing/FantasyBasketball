// Model of fantasy League settings
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FantasyLeagueSettings = new Schema({
    divisions: {
        numberOfDivisions: { type: Number, default: 2 },
        divisionNames: { type: [String], default: ['East', 'West'] } 
    },
    draft: {
        allowDraftPickTrading: {
            type: Boolean,
            default: false
        },
        draftTime: { type: Date, default: '2019-10-20T04:45:00.000Z' },
        draftType: { // Snake, Auction, Offline(leagueManager inputs teams?)
            type: String,
            default: 'SNAKE',
            required: true
        },
        draftOrder: {
            type: [ String ], // userIds
            default: []
        },
        timePerPick: {
            type: Number,
            default: 60 // 60 seconds
        }
    },
    generalSettings: {
        numberOfTeams: { // between 4 and 20
            type: Number,
            default: 12,
            required: true
        },
        lineupLockSetting: {
            type: String,
            default: 'FIRST_GAME_OF_DAY' // WEEKLY, FIRST_GAME_OF_DAY, INDIVIDUAL_GAME_TIME
        }
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
    // the limit on money that can be spent on a roster
    salaryCap: {
        // daily cap in $ value
        dailyCapInMoney: { type: Number, default: 100000 },
        // daily cap in value determined by number of days a player is allowed to be signed to
        dailyCapInDays: { type: Number, default: 1 },
        // yearly cap in $ value
        yearlyCapInMoney: { type: Number, default: 100000 },
        // my favorite idea and why I created this app in the first place...
        // Dynasty Mode
        // A team gets a salary cap who's currency is number of years a team is
        // able to allocate to their entire roster
        yearlyCapInYears: { type: Number, default: 50 }
    },
    schedule: {
        startOfSeason: { type: Date, default: '2019-10-22T04:45:00.000Z' },
        endOfSeason: { type: Date, default: '2020-04-20T04:45:00.000Z' },
        numberOfWeeks: { type: Number, default: 18 },
        numberOfPlayoffRounds: { type: Number, default: 2 },
        numberOfPlayoffTeams: { type: Number, default: 4 },
        tieBreaker: { type: String, default: 'BENCH_POINTS' },
        weeksPerPlayoffMatchup: { type: Number, default: 1 }
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
    },
    trade: {
        numberOfVotesToVeto: { type: Number, default: 6 }, // Default roster size divided by 2
        tradeDeadline: { type: Date, default: '2020-04-20T04:45:00.000Z' },
        tradeReviewPeriod: { type: Number, default: 2 } // 2 days
    },
    transactions: {
        observeUndroppablePlayers: { type: Boolean, default: false },
        playerUniverse: { type: String, default: 'ALL' }, // ALL, WEST, EAST

    },
    waiver: {
        waiverPeriod: { type: Number, default: 2 }, // 2 days
        waiverOrder: { type: [ String ], default: [] }, // userIds
        waiverDeadline: { type: Date, default: '2020-04-20T04:45:00.000Z' },
    }
})

module.exports = FantasyLeagueSettings

// Model of fantasy League settings
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlayerContractSchema = new Schema({
    contractData: {
        signDate: { type: Date, required: true },
        experationDate: { type: Date, required: true },
        contractSalary: { type: Number, required: true },
        isEnabled: { type: Boolean, required: true, default: true },
        freeAgent: { type: String, required: true } // RFA, UFA
    },
    leagueData: {
        leagueId: { type: String, required: true },
        teamOwnerId: { type: String, required: true },
        fantasyTeamId: { type: String, required: true } 
    },
    playerData: {
        playerId: { type: String, required: true },
        teamId: { type: String, required: true },
        lastName: { type: String, required: true },
        firstName: { type: String, required: true }
    }
})

module.exports = PlayerContract = mongoose.model('contracts', PlayerContractSchema)

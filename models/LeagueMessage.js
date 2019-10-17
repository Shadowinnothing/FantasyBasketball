// Model of a fantasy league
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LeagueMessageSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    timeMessageSent: {
        type: Date,
        default: Date.now()
    },
    messageText: {
        type: String,
        required: true
    },
    experationTime: {
        type: Date,
        default: Date.now() + (60 * 60 * 1000)
    },
    leagueId: {
        type: String,
        required: true
    }
})

module.exports = LeagueMessage = mongoose.model('leagueMessages', LeagueMessageSchema)

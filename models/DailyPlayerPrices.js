// Model of a fantasy team
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create PlayerSalaries Schema
const PlayerSalariesSchema = new Schema({
    playerId: {
        type: String
    },
    playerPrice: {
        type: String
    }
})

module.exports = PlayerSalaries = mongoose.model('dailyFantasySalaries', PlayerSalariesSchema)

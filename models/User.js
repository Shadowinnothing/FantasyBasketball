const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    screenName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        type: String
    },
    teams: {
        type: [ Number ] // links to teamId
    }
})

module.exports = User = mongoose.model('users', UserSchema)

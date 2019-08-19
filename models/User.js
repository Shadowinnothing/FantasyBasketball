const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    screenName: {
        type: String,
        required: true
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
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        type: String
    },
    teams: {
        type: [ String ] // links to teamId
    }
})

module.exports = User = mongoose.model('users', UserSchema)

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
//const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('users')

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = keys.secretOrKey

// Passport is a var getting passed in from server.js
module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (jwtPayload, done) => {
            //console.log(JSON.stringify(jwtPayload, undefined, 2))
            User.findById(jwtPayload.id)
                .then(user => {
                    if(user) {
                        // return null for no error
                        return done(null, user)
                    }
                    // no user found
                    return done(null, false)
                })
                .catch(err => console.log(err))
        })
    )
}

// middleware that authorizes the jwt
const jwt = require('jsonwebtoken')

const { jwtSecret } = require('../config/keys')

module.exports = (req, res, next) => {
    // get token from header
    let token = req.header('authtoken')

    // If the token has not stripped the secret code, we wanna strip that
    // This is kind've hacky and I kind've hate it, but that's showbiz baby
    if(token && token.includes(',')) token = token.split(',')[0]

    // check if token exists
    if(!token)
        return res.status(401).json({ msg: 'No Token, auth denied' })
    
    // Verify token
    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded.user
        next()
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }

}
// middleware that authorizes the jwt
const jwt = require('jsonwebtoken')

const { jwtSecret } = require('../config/keys')

module.exports = (req, res, next) => {
    // get token from header
    const token = req.header('x-auth-token')

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
const axios = require('axios')

const keys = require('../config/keys')

module.exports = axios.create({
    baseURL: keys.nbaApiURL,
    headers: {
        "X-RapidAPI-Host": keys.XRapidAPIHost,
        "X-RapidAPI-Key": keys.XRapidAPIKey
    }
})
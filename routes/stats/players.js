const router = require('express').Router()
const axios = require('axios')

const keys = require('../../config/keys')

const config = {
  headers: {
    'X-RapidAPI-Host': keys.XRapidAPIHost,
    'X-RapidAPI-Key': keys.XRapidAPIKey
  }
}

// CONVERT TO TODAYS GAMES!!!!

// @route   GET /stats/players/:playerId
// @desc    Get all stats from single player
// @access  Public
router.get('/:playerId', (req, res) => {

    

})

module.exports = router;
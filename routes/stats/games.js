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

// @route   GET /stats/games/today
// @desc    Get all games and scores from the current day
// @access  Public
router.get('/today', (req, res) => {
  axios.get(`${keys.nbaApiURL}/games/date/2019-04-14`, config)
    .then(d => {return res.json(d.data.api)
    })
    .catch(err => {return res.send(err)})
})

module.exports = router;

const router = require('express').Router()

const nba = require('../../config/nbaApi')

// @route   GET /stats/today
// @desc    Get all games and scores from the current day
// @access  Public
router.get('/today', (req, res) => {
  axios.get(`${nba.NBAAPIURL}/games/date/2019-04-14`, nba.config)
    .then(res => console.log(JSON.stringify(res.data, undefined, 2)))
    .catch(err => console.log(err))
})

module.exports = router;

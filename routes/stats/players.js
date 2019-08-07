const router = require('express').Router()
const nba = require('../../apis/nba')

// @route   GET /stats/players/allPlayers
// @desc    Get all players in the NBA
// @access  Public
router.get('/allPlayers', async (req, res) => {
  let allPlayers = await nba.get('/players/league/standard')
  // filter out players not on a roster
  allPlayers = allPlayers.data.api.players.filter(player => player.teamId !== null)
  res.send({ players: allPlayers })
})

// @route   GET /stats/players/search/:term
// @desc    Get all players related to term string in req.params.term
// @access  Public
router.get('/search/:term', async (req, res) => {

  let relatedPlayers = await nba.get(`/players/lastName/${ req.params.term }`)

  relatedPlayers = relatedPlayers.data.api.players
  res.send({ relatedPlayers })
})

module.exports = router;
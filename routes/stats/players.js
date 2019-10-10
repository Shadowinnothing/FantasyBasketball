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
  console.log(req.params.term)
  let relatedPlayersLastName = await nba.get(`/players/lastName/${ req.params.term }`)
    .catch(err => console.log(err))
  relatedPlayersLastName = relatedPlayersLastName.data.api.players
  
  let relatedPlayersFirstName = await nba.get(`/players/firstName/${ req.params.term }`)
  relatedPlayersFirstName = relatedPlayersFirstName.data.api.players
  
  const merged = [...relatedPlayersLastName, ...relatedPlayersFirstName]
    //.filter(player => player.teamId !== null && player.leagues.standard && player.country > '')
  console.log(merged)

  res.send({ relatedPlayers: merged  })
})

module.exports = router;
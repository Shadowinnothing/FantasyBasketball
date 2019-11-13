const router = require('express').Router()
const nba = require('../../apis/nba')

// All NBA teams to save a hit to the servers and filter out the non-NBA teams
const teamNames = [
  { teamId: 1, name: "Atlanta Hawks" },
  { teamId: 2, name: "Boston Celtics" },
  { teamId: 4, name: "Brooklyn Nets" },
  { teamId: 5, name: "Charlotte Hornets" },
  { teamId: 6, name: "Chicago Bulls" },
  { teamId: 7, name: "Cleveland Cavaliers" },
  { teamId: 8, name: "Dallas Mavericks" },
  { teamId: 9, name: "Denver Nuggets" },
  { teamId: 10, name: "Detroit Pistons" },
  { teamId: 11, name: "Golden State Warriors" },
  { teamId: 14, name: "Houston Rockets" },
  { teamId: 15, name: "Indiana Pacers" },
  { teamId: 16, name: "LA Clippers" },
  { teamId: 17, name: "Los Angeles Lakers" },
  { teamId: 19, name: "Memphis Grizzlies" },
  { teamId: 20, name: "Miami Heat" },
  { teamId: 21, name: "Milwaukee Bucks" },
  { teamId: 22, name: "Minnesota Timberwolves" },
  { teamId: 23, name: "New Orleans Pelicans" },
  { teamId: 24, name: "New York Knicks" },
  { teamId: 25, name: "Oklahoma City Thunder" },
  { teamId: 26, name: "Orlando Magic" },
  { teamId: 27, name: "Philadelphia 76ers" },
  { teamId: 28, name: "Phoenix Suns" },
  { teamId: 29, name: "Portland Trail Blazers" },
  { teamId: 30, name: "Sacramento Kings" },
  { teamId: 31, name: "San Antonio Spurs" },
  { teamId: 38, name: "Toronto Raptors" },
  { teamId: 40, name: "Utah Jazz" },
  { teamId: 41, name: "Washington Wizards" }
]

// @route   GET /stats/players/allPlayers
// @desc    Get all players in the NBA
// @access  Public
router.get('/allPlayers', async (req, res) => {
  let allPlayers = await nba.get('/players/league/standard')
  allPlayers = allPlayers.data.api.players.filter(player => player.teamId !== null) // <- filter out players not on a roster

	let allTeamData = await nba.get(`/teams/league/standard`)
	allTeamData = allTeamData.data.api.teams

    // Find the team accociated with the given player and attach that data
	allPlayers = allPlayers.map(player => {
    let playersTeam = allTeamData.filter(team => team.teamId === player.teamId)[0]
    return {
      ...player,
      teamData: {
        city: playersTeam.city,
        fullName: playersTeam.fullName,
        nickName: playersTeam.nickname,
        shortName: playersTeam.shortName
      },
      playerPrice: '5000'
    }
  })
  
  // If a player is not active, remove them from the list
  allPlayers = allPlayers.filter(player => player.leagues.standard.active === '1')

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
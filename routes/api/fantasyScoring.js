// routes for all things NBA scoring related, irl and fantasy

const router = require('express').Router()
//const axios = require('axios')
const { check, validationResult } = require('express-validator')

const auth = require( '../../middleware/auth')
const calculateFantasySalary = require('../../middleware/fantasy/calculateFantasySalary')
const nba = require('../../apis/nba')

// @route   GET /api/fantasyScoring/calculatePlayerSalary
// @desc    Calculates the players salary and returns int of salary
// @access  Private
router.get('/calculatePlayerSalary', [
	check('playerId', 'playerId is required').exists(),
], auth, async (req, res) => {

	const errors = validationResult(req)
	if(!errors.isEmpty()){
		return res.status(400).json({ errors: errors.array() })
	}

	const playerId = req.headers.playerid

	// grab stats from the last 7 games that player has played in
	const allGames = await nba.get(`/statistics/players/playerId/${ playerId }`)
	const lastSevenGamesStats = allGames.data.api.statistics.slice(Math.max(allGames.data.api.statistics.length - 7, 1))

	const stats = [
		'min', 'points', 'totReb', 'assists', 'steals', 'blocks'
	]
	const playerAverages = {}

	// get the sum total of all playerStats 
	lastSevenGamesStats.map(gameStats => {
		stats.forEach(stat => 
			playerAverages[ stat ]
				? playerAverages[ stat ] += parseInt(gameStats[ stat ])
				: playerAverages[ stat ] = parseInt(gameStats[ stat ])
		)
	})

	// calculate average of all playerStats
	for(let stat in playerAverages){
		playerAverages[stat] = (playerAverages[stat] / 7).toFixed(2)
	}

	// calculate salary
	let playerSalary = calculateFantasySalary(playerAverages)
	playerSalary = playerSalary.toFixed()

	res.send({ playerAverages, playerSalary })
})

module.exports = router;
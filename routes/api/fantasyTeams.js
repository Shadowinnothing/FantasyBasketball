const router = require('express').Router()
//const axios = require('axios')
const { check, validationResult } = require('express-validator')

const auth = require( '../../middleware/auth')

const User = require('../../models/User')
const FantasyTeam = require('../../models/FantasyTeam')

// @route   GET /api/fantasyTeams/getAllUserTeams
// @desc    Get all Fantasy Teams associated with the user
// @access  Private
router.get('/getAllUserTeams', auth, async (req, res) => {

  const userId = req.user.id

  try {
    const user = await User.findOne({ _id: userId })

    const allTeams = user.teams

    res.send({ allTeams })
  } catch(err) {
    res.send({ err })
  }
})

// @route   POST /api/fantasyTeams/createTeam
// @desc    Create a fantasy team
// @access  Private
router.post('/createTeam', [
  check('leagueId', 'LeagueId is required').exists(),
  check('teamName', 'teamName is required').exists(),
  check('teamOwner', 'teamOwner is required').exists()
], auth, async (req, res) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
  }

  const { leagueId, teamName, teamOwner } = req.body

  const newTeam = new FantasyTeam({
    leagueId, teamName, teamOwner
  })

  await newTeam.save()

  res.send({ newTeam })
})

module.exports = router;
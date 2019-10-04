const router = require('express').Router()
//const axios = require('axios')
const { check, validationResult } = require('express-validator')

const auth = require( '../../middleware/auth')

const User = require('../../models/User')
const FantasyTeam = require('../../models/FantasyTeam')
const League = require('../../models/League')

// @route   GET /api/fantasyTeams/getAllUserTeams
// @desc    Get all Fantasy Teams associated with the user
// @access  Private
router.get('/getAllUserTeams', auth, async (req, res) => {

  const userId = req.user.id

  try {
    let allTeams = await FantasyTeam.find()
    allTeams = allTeams.filter(t => t.teamOwner === userId) 
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
  check('teamOwner', 'teamOwner is required').exists(),
  check('isManager', 'isManager is required').exists()
], auth, async (req, res) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
  }

  const { leagueId, teamName, teamOwner, isManager } = req.body

  try {
    const newTeam = new FantasyTeam({
      leagueId, teamName, teamOwner, isManager
    })
    await newTeam.save()
    
    // Have to append the newTeam.id to the League and User objects in the db
    await League.findByIdAndUpdate({ _id: leagueId }, { $push: { teamOwners: teamOwner } })
    await User.findByIdAndUpdate({ _id: teamOwner }, { $push: { teams: newTeam._id } })
  
    res.send({ newTeam })
  } catch(err) {
    return err
  }
})

module.exports = router;
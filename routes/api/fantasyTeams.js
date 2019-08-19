const router = require('express').Router()
const axios = require('axios')
//const { check, validationResult } = require('express-validator')

const auth = require( '../../middleware/auth')

const User = require('../../models/User')

// @route   Get /api/fantasyTeams/getAllUserTeams
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

module.exports = router;
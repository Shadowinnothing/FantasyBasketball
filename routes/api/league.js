const router = require('express').Router()
const { check, validationResult } = require('express-validator')

const auth = require( '../../middleware/auth')
//const nba = require('../../apis/nba')

const League = require('../../models/League')

// @route   POST /api/league/create/
// @desc    Create a league 
// @access  Private
router.post('/create', [
  check('leagueName', 'League name is required').isLength({ min: 6, max: 30 }),
  check('leagueType', 'A League type is required').exists(),
  check('leagueManagers', 'At least 1 League manager is required').isInt()
  ], 
  auth,
  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { leagueName, leagueType } = req.body
    const leagueManagers = [req.body.leagueManagers]

    const league = new League({
      leagueName,
      leagueType,
      leagueManagers
    })

    await league.save()

    res.send({ league })
})



module.exports = router;
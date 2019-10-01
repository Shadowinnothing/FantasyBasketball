const router = require('express').Router()
const { check, validationResult } = require('express-validator')

const auth = require( '../../middleware/auth')
const leagueAuth = require('../../middleware/leagueAuth')
const cleanUser = require( '../../middleware/cleanUser')

const League = require('../../models/League')
const User = require('../../models/User')

// @route   POST /api/league/create
// @desc    Create a league 
// @access  Private
router.post('/create', [
  check('leagueName', 'League name is required').isLength({ min: 6, max: 30 }),
  check('leagueType', 'A League type is required').exists()
  ], 
  auth,
  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { leagueName, leagueType } = req.body
    
    // added entire user object to the JWT
    // data is now accessed by ._doc
    // console.log(req.user) // to see contents of JWT for future debugging
    const leagueManagers = [ cleanUser(req.user) ]

    const league = new League({
      leagueName,
      leagueType,
      leagueManagers,
      leagueSettings: {} // default league settings
    })

    await league.save()

    res.send({ league })
})

// @route   POST /api/league/update
// @desc    Update a league with new settings
// @access  Private
router.post('/update', auth, async (req, res) => {

    const { user } = req
    const { leagueId, leagueName, leagueType } = req.body
    const userId = user.id

    let leagueToUpdate = null

    if(!leagueId){
        return res.send({ error: 'Need a leagueId to update' })
    }

    try {
        leagueToUpdate = await leagueAuth(leagueId, userId)

        if(leagueToUpdate.errors){
            return res.send(leagueToUpdate.error)
        }

        if(leagueName){
            leagueToUpdate.leagueName = leagueName
        }

        // I don't think this should be editable, keeping it for now
        // until the LeagueSettings modal is wired up
        if(leagueType){
            leagueToUpdate.leagueType = leagueType
        }

        await leagueToUpdate.save()

        return res.send(leagueToUpdate)
    } catch(err) {
        return res.send({ err })
    }
})

// @route   DELETE /api/league/
// @desc    Delete a league
// @access  Private
router.delete('/', auth, async (req, res) => {
  
    const { leagueId } = req.body
    const { user } = req
    const userId = user.id

    if(!leagueId){
    return res.send({ error: 'Need a leagueId to update' })
    }

    let leagueToDelete = await leagueAuth(leagueId, userId)
    console.log(leagueToDelete)

    res.send({ msg: `League ${leagueId} has been deleted` })
})

// @route   GET /api/league/getAllUserLeagues
// @desc    Get all Fantasy Leagues associated with the user
// @access  Private
router.get('/getAllUserLeagues', auth, async (req, res) => {

    // grab all leagues from db
    let find = await League.find()

    const usersLeagues = find.filter(f => f.leagueManagers.filter(man => man._id).length)

    res.send({ usersLeagues })
})

// @route   GET /api/league/allLeagueData/:leagueId
// @desc    Return all data relating to a single Fantasy League
// @access  Private
router.get('/allLeagueData/:leagueId', auth, async (req, res) => {
    const id = req.params.leagueId
    const leagueData = await League.find({ _id: id })
    res.send({ leagueData })
})

// @route   POST /api/league/addTeamOwner
// @desc    Add a new fantasy team owner to the league
// @access  Private
router.post('/addTeamOwner', auth, [
    check('leagueId', 'leagueId is required').exists(),
    check('leagueManagerId', 'leagueManagerId is required').exists(),
    check('newOwnerUserId', 'newOwnerUserId is required').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { leagueId, newOwnerUserId, leagueManagerId } = req.body
    let leagueToUpdate = null

    try {
        leagueToUpdate = await leagueAuth(leagueId, leagueManagerId)
        if(leagueToUpdate.error){
            return res.status(412).send(leagueToUpdate.error)
        }

        let newUser = await User.findById(newOwnerUserId)
        newUser = cleanUser(newUser)

        // push newOwnerUserId to the league's teamOwners
        const data = await League.findByIdAndUpdate(leagueId, 
            { $push: { teamOwners: newUser } },
            { useFindAndModify: false, new: true }
        )
        console.log(data)

        // Add leagueId to user 
        // Might have to restructor this entire thing...
        // May or may not return to fix this 
        // let userData = await User.findByIdAndUpdate(newOwnerUserId,
        //     { $push: { teamOwners: newUser } },
        //     { useFindAndModify: false, new: true }
        // )
        // userData = cleanUser(userData)
        // console.log(userData)

    } catch(err) {
        console.log(err)
        return res.status(500).send('Server Broken')
    }

    return res.status(200).send({ msg: `user ${newOwnerUserId} added to league ${leagueId}` })
})

module.exports = router;
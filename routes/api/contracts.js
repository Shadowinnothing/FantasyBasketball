const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const moment = require('moment')

const auth = require( '../../middleware/auth')

const PlayerContract = require('../../models/PlayerContract')
//const User = require('../../models/User')
// const leagueAuth = require('../../middleware/leagueAuth')
// const cleanUser = require( '../../middleware/cleanUser')

// @route   POST /api/contracts/sign
// @desc    Sign a contract for your fantasy league
// @access  Private
router.post('/sign', auth, [
    check('experationDate', 'experationDate is required').exists(),
    check('contractSalary', 'contractSalary is required').exists(),
    check('freeAgent', 'freeAgent is required (RFA, UFA)').exists(),

    check('leagueId', 'leagueId is required').exists(),
    check('teamOwnerId', 'teamOwnerId is required').exists(),
    
    check('playerId', 'players playerId is required (NBA player\'s id)').exists(),
    check('teamId', 'players teamId is required (NBA team teamId)').exists(),
    check('lastName', 'players lastName is required').exists(),
    check('firstName', 'players firstName is required').exists(),
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    
    const {
        experationDate, contractSalary, freeAgent,
        leagueId, teamOwnerId,
        playerId, teamId, lastName, firstName
    } = req.body

    try {

        const newContract = new PlayerContract({
            contractData:{
                signDate: Date.now(), experationDate, contractSalary, freeAgent
            },
            leagueData: {
                leagueId, teamOwnerId
            },
            playerData: {
                playerId, teamId, lastName, firstName
            }
        })

        await newContract.save()

        res.status(200).send({newContract})

    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router;
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
    check('fantasyTeamId', 'fantasyTeamId is required').exists(),
    
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
        leagueId, teamOwnerId, fantasyTeamId,
        playerId, teamId, lastName, firstName
    } = req.body

    try {

        const newContract = new PlayerContract({
            contractData:{
                signDate: Date.now(), experationDate, contractSalary, freeAgent
            },
            leagueData: {
                leagueId, teamOwnerId, fantasyTeamId
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

// @route   Get /api/contracts/getAllByUserId/:userId
// @desc    Return EVERY contract accociated with the given userId
// @access  Private
router.get(`/getAllByUserId/:userId`, auth, async (req, res) => {
    const allContracts = await PlayerContract.find()
    const usersContracts = allContracts.filter(contract => contract.leagueData.teamOwnerId === req.params.userId)
    res.json({ usersContracts })
})

// @route   Get /api/contracts/enabledContracts/getAllByUserId/:userId
// @desc    Return every currently enabled contract accociated with the given 
// @access  Private
router.get(`/enabledContracts/getAllByUserId/:userId`, auth, async (req, res) => {
    const allContracts = await PlayerContract.find()
    const usersContracts = allContracts.filter(contract => {

        // if the contract is expired, set isEnabled to false so the player is not returned
        const expDate = moment(contract.contractData.experationDate).unix() * 1000
        if(expDate < Date.now()){
            contract.contractData.isEnabled = false
            updatedContract = new PlayerContract(contract)
            updatedContract.save()
            return
        }

        if(contract.leagueData.teamOwnerId === req.params.userId && contract.contractData.isEnabled){
            return contract
        }
    })

    res.json({ usersContracts })
})

// @route   Get /api/contracts/enabledContracts/getAllByFantasyTeamId/:fantasyTeamId
// @desc    Return every currently enabled contract accociated with the given fantasyTeamId
// @access  Private
router.get(`/enabledContracts/getAllByFantasyTeamId/:fantasyTeamId`, auth, async (req, res) => {
    const allContracts = await PlayerContract.find()
    const usersContracts = allContracts.filter(contract => {

        // if the contract is expired, set isEnabled to false so the player is not returned
        const expDate = moment(contract.contractData.experationDate).unix() * 1000
        if(expDate < Date.now()){
            contract.contractData.isEnabled = false
            updatedContract = new PlayerContract(contract)
            updatedContract.save()
            return
        }

        if(contract.leagueData.fantasyTeamId === req.params.fantasyTeamId && contract.contractData.isEnabled){
            return contract
        }
    })

    res.json({ usersContracts })
})

module.exports = router;
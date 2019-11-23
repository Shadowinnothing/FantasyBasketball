const router = require('express').Router()
var mongoose = require('mongoose');
var db = mongoose.connection;
const { check, validationResult } = require('express-validator')
//const jwt = require('jsonwebtoken')

const systemUserAuth = require('../../middleware/systemUserAuth')
//const { jwtSecret } = require('../../config/keys')
//const cleanUser = require('../../middleware/cleanUser')

// @route   DELETE /api/systemAdmin/clearTable
// @desc    Clear all tables in the db from a given array, ex ['users', 'leagues']
// @access  System User
router.delete('/clearTable', [
    check('tablesToClear', 'tablesToClear is required').exists(),
], systemUserAuth, async (req, res) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { tablesToClear } = req.body
    const tableOptions = ['users', 'contracts', 'dailyfantasysalaries', 'leagues', 'leaguemessages', 'teams']

    // if an empty array is sent in, return all possible options for tables to clear
    if(!tablesToClear.length) {
        const resMessage = {
            msg: "Empty array sent in, here are your options"
        }
        tableOptions.forEach(option => {
            resMessage[option] = `To clear ${ option } table`
        })

        return res.status(401).json(resMessage)
    }

    try {

        resMessage = {}

        tablesToClear.forEach(async table => {
            if(!tableOptions.includes(table)) {
                return res.status(401).json({ msg: `${ table } is not a valid table option` })
            }

            if(table === 'users') await db.dropCollection('users')
            if(table === 'contracts') await db.dropCollection('contracts')
            if(table === 'dailyfantasysalaries') await db.dropCollection('dailyfantasysalaries')
            if(table === 'leagues') await db.dropCollection('leagues')
            if(table === 'leaguemessages') await db.dropCollection('leaguemessages')
            if(table === 'teams') await db.dropCollection('teams')
        })        

    } catch(err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }

    return res.status(200).json({ msg: "Tables cleared" })
})


module.exports = router
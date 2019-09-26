const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = require( '../../middleware/auth')
const cleanUser = require( '../../middleware/cleanUser')

const User = require('../../models/User')
const { jwtSecret } = require('../../config/keys')

// @route   POST /api/users/
// @desc    Create New User
// @access  Public
router.post('/', [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Email is Required').isEmail(),
    check('password', 'Password is Required (Minimum 6 Characters)').isLength({ min: 6, max: 30 }),
    check('screenName', 'ScreenName is Required (Minumum 6 Characters').isLength({ min: 6, max: 30 })
], async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, screenName } = req.body

    try {
        let user = await User.findOne({ email })

        if(user){
            return res.status(400).json({ errors: [{ msg: 'User already Exists' }] })
        }

        // gravatar settings
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'r',
            d: 'mm'
        })

        user = new User({
            name, email, avatar, password, screenName
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        // jwt for saved user
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, jwtSecret, { expiresIn: 36000 }, (err, token) => {
            if(err) throw err
            res.json({ token })
        })
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST /api/users/search
// @desc    Search for users using their email/username
// @access  Private
router.post('/search', auth, [
    check('searchTerm', 'A Search Term is required').exists(),
    check('searchTerm', 'Search Term has to be between 2 and 30 characters').isLength({ min: 4, max: 30 }),
], async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    let { searchTerm } = req.body
    searchTerm = searchTerm.toLowerCase()

    try {
        let users = await User.find()
        // return users with an email/screenName containing the searchTerm
        users = users.filter(user => 
            user.email.substring(0, user.email.lastIndexOf("@")).toLowerCase().includes(searchTerm)
            || user.screenName.toLowerCase().includes(searchTerm)
        )
        // strip password from returned users
        users = users.map(user => { 
            user = cleanUser(user)
            return user
        })

        res.send({ users })
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST /api/users/friends/add
// @desc    Add a friend to the current user
// @access  Private
router.post('/friends/add', auth, async (req, res) => {
    // these names are stupid and I hate them but I can't think of anything better atm
    // They explain themselves sure but blegh
    const { friendBeingAddedId, userAddingFriendId } = req.body

    if(!friendBeingAddedId){
        return res.status(404).send({ msg: 'newOwnerUserId Not Found' })
    }

    // find user and remove sensitive data
    let friendBeingAdded = await User.findById(friendBeingAddedId)
    friendBeingAdded = cleanUser(friendBeingAdded)

    // add user to user's friend list
    try {
        // add new friend to current user
        let newUserData = await User.findByIdAndUpdate(userAddingFriendId, 
            { $push: { friends: friendBeingAdded } },
            { useFindAndModify: false, new: true }
        )
        let newFriendsList = newUserData.friends
        newUserData = cleanUser(newUserData)
        newUserData.friends = newFriendsList

        // add current user to new friends friend's list
        await User.findByIdAndUpdate(friendBeingAddedId, 
            { $push: { friends: newUserData } },
            { useFindAndModify: false, new: true }
        )

        res.status(200).send({ newUserData })
    } catch(err) {
        console.log(err)
        return res.status(500).send('Server Broken')
    }
})

module.exports = router
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
                ...user._doc,
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
router.post('/friends/add', auth, [
    check('friendBeingAddedId', 'friendBeingAddedId is required').exists(),
    check('userAddingFriendId', 'userAddingFriendId is required').exists(),
], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    // these names are stupid and I hate them but I can't think of anything better atm
    // They explain themselves sure but blegh
    const { friendBeingAddedId, userAddingFriendId } = req.body

    // find users, if userAddingFriendId exists in new freind friends list do not add as friend
    // if they dont exist, return a 404
    const friendBeingAdded = await User.findById(friendBeingAddedId)
    const userAddingFriend = await User.findById(userAddingFriendId)

    if(friendBeingAdded.friends.includes(userAddingFriendId)) {
        return res.status(401).send({ error: 'users are already friends' })
    }

    if(!friendBeingAddedId){
        return res.status(404).send({ error: 'friendBeingAdded Not Found' })
    }

    if(!userAddingFriend){
        return res.status(404).send({ error: 'userAddingFriend Not Found' })
    }

    // add user to user's friend list
    try {
        // add new friend to current user
        await User.findByIdAndUpdate(userAddingFriendId, 
            { $push: { friends: friendBeingAddedId } },
            { useFindAndModify: false, new: true }
        )

        // add current user to new friends friend's list
        await User.findByIdAndUpdate(friendBeingAddedId, 
            { $push: { friends: userAddingFriendId } },
            { useFindAndModify: false, new: true }
        )

        res.status(200).send({ message: `User ${ userAddingFriendId } added user ${ friendBeingAddedId } as a friend` })
    } catch(err) {
        console.log(err)
        return res.status(500).send('Server Broken')
    }
})

// @route   GET /api/users/friends/getAll/:id
// @desc    Return all friends data from a user's friends list
// @access  Private
router.get(`/friends/getAll/:id`, auth, async (req, res) => {
    // pull user sent in from request
    const user = await User.findById(req.params.id)
    
    // grab and return all friends data
    const allFriendsData = await Promise.all(user.friends.map(async id => {
        try {
            let yee = await User.findById(id)
            yee = cleanUser(yee)
            return yee
        } catch(err) {
            console.log(err)
            return err
        }
        
    }))
    
    res.status(200).send({ allFriendsData })
})

// @route   DELETE /api/users/clearAllTestUsers
// @desc    Clear every test user from the database
// @access  Private
router.delete(`/clearAllTestUsers`, auth, async (req, res) => {

    // grab every user from db, if they're a randomly generated test user, delete them
    await User.find({}, (err, allUsers) => {
        allUsers.forEach(async user => {
            const userEmail = user.email.split('@')[1]
            if(userEmail === 'testUser.com'){
                User.findOneAndDelete({ _id: user._id })
                    .then(res => console.log(res))
            }
        })
    })    
    
    res.status(200).send({ msg: 'Test Users Deleted' })
})

module.exports = router
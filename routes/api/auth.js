const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = require('../../middleware/auth')
const { jwtSecret } = require('../../config/keys')

// @route   GET /api/auth/
// @desc    Returned currentely authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        // find user in db using token
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// @route   POST /api/auth/
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
    check('email', 'Email is Required').isEmail(),
    check('password', 'Password is Required').exists(),
], async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        console.log(user)

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

module.exports = router
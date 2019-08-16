const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        console.erro(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router
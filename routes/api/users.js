const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

// @route   POST /api/users/
// @desc    Create New User
// @access  Public
router.post('/', [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Email is Required').isEmail(),
    check('password', 'Password is Required (Minimum 6 Characters)').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if(user){
            res.status(400).json({ errors: [{ msg: 'User already Exists' }] })
        }

        // gravatar settings
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'r',
            d: 'mm'
        })

        user = new User({
            name, email, avatar, password
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()
        
        res.json({ user })
    } catch(err) {
        console.erro(err.message)
        res.status(500).send('Server Error')
    }

    
})

module.exports = router
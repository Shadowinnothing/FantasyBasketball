const router = require('express').Router()

const User = require('../../models/User')

router.get('/', (req, res) => {
  res.json({ message: "success!!!" })
})

module.exports = router;

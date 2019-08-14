const router = require('express').Router()
const nba = require('../../apis/nba')

// @route   GET /stats/teams/getTeamByCity/:cityName
// @desc    Get Get a single NBA team by it's cityName
// @access  Public
router.get('/getTeamByCity/:cityName', async (req, res) => {
    let team = await nba.get(`/teams/city/${req.params.cityName}`)
    console.log(team.data.api.teams[0])
    const { fullName, teamId } = team.data.api.teams[0]
    res.send({ fullName, teamId })
})

module.exports = router;
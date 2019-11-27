const League = require('../models/League')
const FantasyTeam = require('../models/FantasyTeam')

// leagueId - league to be updated
// userId - Isn't used
// leagueManagerTeamId - teamId making changes, saves the leagueManager value
module.exports = async ( leagueId, userId, leagueManagerTeamId ) => {
    // check if leagueId exists
    let leagueToUpdate = await League.findOne({ _id: leagueId }) || null
    let usersTeam = await FantasyTeam.findOne({ _id: leagueManagerTeamId }) || null

    if(!leagueToUpdate){
        return { error: 'League does not exist' }
    }

    if(!usersTeam) {
        return { error: 'User Team does not exist' }
    }

    // check if userId is a manager inside of the league being edited
    // if they are not a manager, tell em to frick off
    if(!usersTeam.isManager){
        return { error: 'user is not a manager' }
    }
    
    return leagueToUpdate
}

// {
//     "leagueSetting": "12",
//     "leagueSetting 2": "YEET"
// }
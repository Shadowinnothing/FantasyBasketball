const League = require('../models/League')

// leagueId - league to be updated
// userId - user making changes
module.exports = async (leagueId, userId) => {
    // check if leagueId exists
    let leagueToUpdate = await League.findOne({ _id: leagueId }) || null
    
    if(!leagueToUpdate){
        return { error: 'League does not exist' }
    }

    // check if userId is a manager inside of the league being edited
    // if they are not a manager, tell em to frick off
    if(!leagueToUpdate.leagueManagers.includes(userId)){
        return { error: 'user is not a manager' }
    }
    
    return leagueToUpdate
}
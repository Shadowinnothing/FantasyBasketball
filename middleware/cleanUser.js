// this util is to remove sensitive data from a given user while being passed around
module.exports = user => {
    user.password = undefined
    user.teams = undefined
    user.friends = undefined
    
    return user
}
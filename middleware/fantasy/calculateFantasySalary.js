const statScoring = {
    points: 1.0,
    totReb: 2.0,
    assists: 2.5,
    steals: 3.0,
    blocks: 3.5
}

// takes in an object of playerStats(shown above) and returns an int
// of the players adjusted fantasy salary
module.exports = playerStats => {

    let sum = 0
    for(stat in statScoring){
        playerStats[stat] = (playerStats[stat] * statScoring[stat]).toFixed(2)
        sum += parseInt(playerStats[stat])
    }
    sum = sum / parseInt(playerStats['min']) * 10000

    return sum
}
// grab basic data for all NBA players in league

module.exports = async nba => {
    let allPlayers = await nba.get('/players/league/standard')
    allPlayers = allPlayers.data.api.players

    // If a player is not active, remove them from the list
    allPlayers = allPlayers.filter(player => player.leagues.standard.active === '1')

    let allTeamData = await nba.get(`/teams/league/standard`)
    allTeamData = allTeamData.data.api.teams

    // Find the team accociated with the given player and attach that data
    allPlayers = allPlayers.map(player => {
        let playersTeam = allTeamData.find(team => team.teamId === player.teamId)

        // if team isn't nba team, stop mapping process
        if(playersTeam === undefined)
            return

        return {
            ...player,
            teamData: {
                city: playersTeam.city,
                fullName: playersTeam.fullName,
                nickName: playersTeam.nickname,
                shortName: playersTeam.shortName
            },

            // leave  as default for now, if any bugs occur with playerPrice
            // having different results on different pages, this could be the culprit
            playerPrice: 5000
        }
    })

    return allPlayers
}
// grab NBA player stats for a single NBA game from a given gameId and playerId

module.exports = async ( playerObj, nba ) => {
    const singleGameData = await nba.get(`/statistics/players/gameId/${ playerObj.gameId }`)

    const playerData = singleGameData.data.api.statistics.find(playerData => playerData.playerId === playerObj.playerId.toString())

    return {
        points: playerData.points,
        assists: playerData.assists,
        offensiveRebounds: playerData.offReb,
        defensiveRebounds: playerData.defReb,
        totalRebounds: playerData.totReb,
        blocks: playerData.blocks,
        steals: playerData.steals,
        minutes: playerData.min,
        fgm: playerData.fgm,
        fga: playerData.fga,
        ftm: playerData.ftm,
        fta: playerData.fta,
        personalFouls: playerData.pFouls,
        turnovers: playerData.turnovers
    }
}
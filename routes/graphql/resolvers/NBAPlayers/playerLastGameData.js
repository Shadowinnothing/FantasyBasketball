// grab stats from last game the given player played

module.exports = async (playerObj, nba) => {
    const allGameData = await nba.get(`/statistics/players/playerId/${ playerObj.playerId }`)

    const lastGameData = allGameData.data.api.statistics[ allGameData.data.api.statistics.length - 1 ]

    return {
        points: lastGameData.points,
        assists: lastGameData.assists,
        offensiveRebounds: lastGameData.offReb,
        defensiveRebounds: lastGameData.defReb,
        totalRebounds: lastGameData.totReb,
        blocks: lastGameData.blocks,
        steals: lastGameData.steals,
        minutes: lastGameData.min,
        fgm: lastGameData.fgm,
        fga: lastGameData.fga,
        ftm: lastGameData.ftm,
        fta: lastGameData.fta,
        personalFouls: lastGameData.pFouls,
        turnovers: lastGameData.turnovers
    }
}
const moment = require('moment')

module.exports = async (playerObj, nba) => {
    const gameData = await nba.get(`/games/date/${ playerObj.date }`)

    let allGames = []

    gameData.data.api.games.map(game => {
        allGames.push({
            gameId: game.gameId,
            startTime: moment(game.startTimeUTC).valueOf(),
            endTime: moment(game.endTimeUTC).valueOf(),
            city: game.city,
            statusGame: game.statusGame,

            awayTeam: {
                city: 'Dude Fuck The Lakers',
                fullName: game.vTeam.fullName,
                nickName: game.vTeam.nickName,
                shortName: game.vTeam.shortName
            },
            homeTeam: {
                city: 'Fix Me Lmao',
                fullName: game.hTeam.fullName,
                nickName: game.hTeam.nickName,
                shortName: game.hTeam.shortName
            },

            awayTeamScore: game.vTeam.score.points,
            homeTeamScore: game.hTeam.score.points
        })
    })

    return allGames
}
// Team Reducer Actions
export const getAllNBATeams = () => dispatch => {
    dispatch({ type: 'GET_ALL_NBA_TEAMS' })
}

// Player Reducer Actions
export const getAllNBAPlayers = () => dispatch => {
    dispatch({ type: 'GET_ALL_NBA_PLAYERS' })
}
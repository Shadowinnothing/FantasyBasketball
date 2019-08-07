import axios from 'axios'

const PlayerReducer = async (state = {}, action) => {
    switch(action.type){
        case 'GET_ALL_NBA_PLAYERS':
            return {
                ...state,
                allNBAPlayers: await axios.get('/stats/players/allPlayers')
            }
        default:
            return state
    }
}

export default PlayerReducer
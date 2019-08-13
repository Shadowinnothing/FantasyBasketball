import { GET_ALL_NBA_PLAYERS } from '../actions/types'

const INITIAL_STATE = {
    NBAPlayers: []
}

const PlayerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_ALL_NBA_PLAYERS:
            return {
                ...state,
                NBAPlayers: action.payload
            }
        default:
            return state
    }
}

export default PlayerReducer
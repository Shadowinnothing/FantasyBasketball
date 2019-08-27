import { GET_ALL_NBA_PLAYERS } from '../actions/types'

const INITIAL_STATE = {
    allPlayers: []
}

const NBAPlayerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_ALL_NBA_PLAYERS:
            return {
                ...state,
                allPlayers: action.payload
            }
        default:
            return state
    }
}

export default NBAPlayerReducer
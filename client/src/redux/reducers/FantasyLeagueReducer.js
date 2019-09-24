import { CREATE_NEW_LEAGUE, CLEAR_LEAGUES, LOAD_USERS_LEAGUES } from '../actions/types'

const INITIAL_STATE = {
    usersLeagues: [] // populate with leagues
}

const FantasyLeagueReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CREATE_NEW_LEAGUE:
            return {
                ...state,
                usersLeagues: [ ...state.usersLeagues, action.payload.data.league ]
            }
        case CLEAR_LEAGUES:
            return {
                usersLeagues: []
            }
        case LOAD_USERS_LEAGUES:
            return {
                usersLeagues: [ ...state.usersLeagues, ...action.payload ]
            }
        default:
            return state
    }
}

export default FantasyLeagueReducer
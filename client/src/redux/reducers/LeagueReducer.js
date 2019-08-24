import { CREATE_NEW_LEAGUE, CLEAR_LEAGUES, LOAD_USERS_LEAGUES } from '../actions/types'

const INITIAL_STATE = {
    usersLeagues: [] // populate with leagues
}

const LeagueReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CREATE_NEW_LEAGUE:
            return {
                ...state,
                usersLeagues: [ ...state.usersLeagues, action.payload.data.league._id ]
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

export default LeagueReducer
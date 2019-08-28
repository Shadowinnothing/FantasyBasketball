import { CREATE_NEW_FANTASY_TEAM, LOAD_USERS_FANTASY_TEAMS } from '../actions/types'

const INITIAL_STATE = {
    usersTeams: []
}

const FantasyLeagueReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CREATE_NEW_FANTASY_TEAM:
            return {
                ...state,
                usersTeams: [ ...state.usersTeams, action.payload ]
            }
        case LOAD_USERS_FANTASY_TEAMS:
            return { 
                ...state,
                usersTeams: [ ...state.usersTeams, ...action.payload ]
            }
        default:
            return state
    }
}

export default FantasyLeagueReducer
import { combineReducers } from 'redux'

import TeamReducer from './TeamReducer'

export default combineReducers({
    NBATeams: TeamReducer
})
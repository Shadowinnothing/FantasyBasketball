import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import PlayerReducer from './PlayerReducer'
import TeamReducer from './TeamReducer'

export default combineReducers({
    Auth: AuthReducer,
    NBATeams: TeamReducer,
    NBAPlayers: PlayerReducer
})
import { combineReducers } from 'redux'

import PlayerReducer from './PlayerReducer'
import TeamReducer from './TeamReducer'

export default combineReducers({
    NBATeams: TeamReducer,
    NBAPlayers: PlayerReducer
})
import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import LeagueReducer from './LeagueReducer'
import PlayerReducer from './PlayerReducer'
import TeamReducer from './TeamReducer'

export default combineReducers({
    Auth: AuthReducer,
    Leagues: LeagueReducer,
    NBAPlayers: PlayerReducer,
    NBATeams: TeamReducer
})
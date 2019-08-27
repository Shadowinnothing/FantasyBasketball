import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import FantasyLeagueReducer from './FantasyLeagueReducer'
import NBAPlayerReducer from './NBAPlayerReducer'
import NBATeamReducer from './NBATeamReducer'

export default combineReducers({
    Auth: AuthReducer,
    Leagues: FantasyLeagueReducer,
    NBAPlayers: NBAPlayerReducer,
    NBATeams: NBATeamReducer
})
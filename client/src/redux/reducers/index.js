import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import FantasyLeagueReducer from './FantasyLeagueReducer'
import FantasyTeamReducer from './FantasyTeamReducer'
import NBAPlayerReducer from './NBAPlayerReducer'
import NBATeamReducer from './NBATeamReducer'

export default combineReducers({
    Auth: AuthReducer,
    Leagues: FantasyLeagueReducer,
    FantasyTeams: FantasyTeamReducer,
    NBAPlayers: NBAPlayerReducer,
    NBATeams: NBATeamReducer
})
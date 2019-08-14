import { GET_ALL_NBA_TEAMS, GET_NBA_TEAM } from '../actions/types'

const teamNames = [
    { teamId: 1, name: "Atlanta Hawks" },
    { teamId: 2, name: "Boston Celtics" },
    { teamId: 4, name: "Brooklyn Nets" },
    { teamId: 5, name: "Charlotte Hornets" },
    { teamId: 6, name: "Chicago Bulls" },
    { teamId: 7, name: "Cleveland Cavaliers" },
    { teamId: 8, name: "Dallas Mavericks" },
    { teamId: 9, name: "Denver Nuggets" },
    { teamId: 10, name: "Detroit Pistons" },
    { teamId: 11, name: "Golden State Warriors" },
    { teamId: 14, name: "Houston Rockets" },
    { teamId: 15, name: "Indiana Pacers" },
    { teamId: 16, name: "LA Clippers" },
    { teamId: 17, name: "Los Angeles Lakers" },
    { teamId: 19, name: "Memphis Grizzlies" },
    { teamId: 20, name: "Miami Heat" },
    { teamId: 21, name: "Milwaukee Bucks" },
    { teamId: 22, name: "Minnesota Timberwolves" },
    { teamId: 23, name: "New Orleans Pelicans" },
    { teamId: 24, name: "New York Knicks" },
    { teamId: 25, name: "Oklahoma City Thunder" },
    { teamId: 26, name: "Orlando Magic" },
    { teamId: 27, name: "Philadelphia 76ers" },
    { teamId: 28, name: "Phoenix Suns" },
    { teamId: 29, name: "Portland Trail Blazers" },
    { teamId: 30, name: "Sacramento Kings" },
    { teamId: 31, name: "San Antonio Spurs" },
    { teamId: 38, name: "Toronto Raptors" },
    { teamId: 40, name: "Utah Jazz" },
    { teamId: 41, name: "Washington Wizards" }
]

const TeamReducer = (state = {}, action) => {
    switch(action.type){
        case GET_ALL_NBA_TEAMS:
            return { ...state, allNBATeams: teamNames }
        case GET_NBA_TEAM:
            const team = teamNames.filter(({ name }) => name === action.payload)
            return { ...state, team: team[0] }
        default:
            return state
    }
}

export default TeamReducer
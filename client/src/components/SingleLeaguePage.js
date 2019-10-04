import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import axios from 'axios'

const SingleLeaguePage = ({ userId, userToken, match, usersLeagues, usersTeams, usersFriends }) => {

    const [ league, setLeague ] = useState()
    const [ userTeam, setUserTeam ] = useState()
    const [ userIsLeagueManager, setUserIsLeagueManager ] = useState(false)

    // save league data to state
    useEffect(() => {
        if(usersLeagues.length) 
            setLeague( usersLeagues.filter(leg => leg._id === match.params.leagueId )[0] )
    }, [usersLeagues])

    // save user's team to state
    useEffect(() => {
        if(usersTeams.length)
            setUserTeam( usersTeams.filter(team => team.leagueId === match.params.leagueId)[0] )
    }, [usersTeams])

    // render different instances of the league route helper
    const displayTeamData = (route, headerText, buttonText) => {
        return (
            <div>
                <h2>{ headerText }</h2>
                <Link to={ route }>
                    <button>{ buttonText }</button>
                </Link>
            </div>
        )
    }

    const renderUserTeam = () => {
        // if user has a team, return jsx of the team name and
        // a button to the single team page
        if(userTeam !== undefined){
            const userTeamRoute = `/leagues/${match.params.leagueId}/teams/${userTeam._id}`
            return displayTeamData (userTeamRoute, `Your Team: ${ userTeam.teamName }`, "Visit Team Page")
        }

        // if user has no team, render the option to
        // create a team for the given league
        const redirectRoute = `/leagues/${match.params.leagueId}/createTeam`
        return displayTeamData(redirectRoute, "No team? Create one now!", "Create Team")
    }

    // returns jsx of an array of friend list items
    const renderFriendList = () => {
        return usersFriends.map( friend => 
            <li 
                onClick={ async () => {

                    // need to move this to the backend

                    const config = {
                        headers: { "authtoken" : userToken }
                    }

                    const data = await axios.post('/api/league/addTeamOwner', {
                        "leagueId": match.params.leagueId,
                        "newOwnerUserId": friend._id,
                        "leagueManagerId": userId
                    }, config)

                    console.log(data)
                }}
                key={ friend.name }
            >
                { friend.name }
            </li>
        )
    }

    // If the user is a league manager we're going to display leagueManager options
    // If not we don't need to print anything
    const renderLeagueManagerOptions = () => {
        return userIsLeagueManager 
            ? (
                <div>
                    <h1>You are a manager</h1>
                    <ul>{ renderFriendList() }</ul>
                </div>
            )
            : (
                <h2>You are not a manager</h2>
            )
    }

    if(league) {
        return (
            <div>
                <h3>League Name: { league.leagueName }</h3>
                <h4>League Type: { league.leagueType }</h4>

                { renderLeagueManagerOptions() }

                { renderUserTeam() }
            </div>
        )
    }
    return <div>Placeholder</div>
}

const mapStateToProps = state => {
    return {
        userId: state.Auth.user._id,
        usersLeagues: state.Leagues.usersLeagues,
        usersTeams: state.FantasyTeams.usersTeams,
        usersFriends: state.Auth.user.friends,
        userToken: state.Auth.token,
        userManagedLeagues: state.Auth.user.userManagedLeagues
    }
}

export default connect(mapStateToProps)(SingleLeaguePage)
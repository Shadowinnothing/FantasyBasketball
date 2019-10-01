import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const SingleLeaguePage = ({ match, usersLeagues, usersTeams }) => {

    const [league, setLeague] = useState()
    const [userTeam, setUserTeam] = useState()

    const redirectRoute = `/leagues/${match.params.leagueId}/createTeam`

    useEffect(() => {
        if(usersLeagues.length) 
            setLeague( usersLeagues.filter(leg => leg._id === match.params.leagueId )[0] )
    }, [usersLeagues])

    useEffect(() => {
        if(usersTeams.length)
            setUserTeam( usersTeams.filter(team => team.leagueId === match.params.leagueId)[0] )
    })

    const renderUserTeam = () => {
        // if user has a team, return jsx of the team name and
        // a button to the single team page
        if(userTeam.teamName){
            //console.log(userTeam)
            const userTeamRoute = `/leagues/${match.params.leagueId}/teams/${userTeam._id}`
            return (
                <div>
                    <h2>Your Team: { userTeam.teamName }</h2>
                    <Link to={ userTeamRoute }>
                        <button>Visit Team Page</button>
                    </Link>
                </div>
            )
        }

        // if user has no team, render the option to
        // create a team for the given league
        return (
            <div>
                <h2>No team? Create one now!</h2>
                <Link to={ redirectRoute }>
                    <button>Create Team</button>
                </Link>
            </div>
        )
    }

    if(league) {
        return (
            <div>
                <h3>League Name: { league.leagueName }</h3>
                <h4>League Type: { league.leagueType }</h4>
                <h4>League Managers: { league.leagueManagers.map(({ id }) => {
                    return (
                        <p key={ id }>{ id }</p>
                    )
                })}</h4>

                { renderUserTeam() }
            </div>
        )
    }
    return <div>Placeholder</div>
}

const mapStateToProps = state => {
    return {
        usersLeagues: state.Leagues.usersLeagues,
        usersTeams: state.FantasyTeams.usersTeams
    }
}

export default connect(mapStateToProps)(SingleLeaguePage)
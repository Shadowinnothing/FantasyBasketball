import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

const SingleFantasyTeamPage = ({ match, userFantasyTeams, userFantasyLeagues }) => {

    const { leagueId, teamId } = match.params

    const [ fantasyTeam, setFantasyTeam ] = useState({})
    const [ fantasyLeague, setFantasyLeague ] = useState({})

    useEffect(() => {
        if(userFantasyTeams.length && userFantasyLeagues.length) {
            setFantasyTeam( userFantasyTeams.filter(team => team._id === teamId)[0] )
            setFantasyLeague( userFantasyLeagues.filter(league => league._id === leagueId)[0] )
        }
    }, [ userFantasyTeams, userFantasyLeagues ])


    return (
        <div>
            <h1>Team Name: { fantasyTeam.teamName }</h1>
            <h1>League Name: { fantasyLeague.leagueName }</h1>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        userFantasyTeams: state.FantasyTeams.usersTeams,
        userFantasyLeagues: state.Leagues.usersLeagues
    }
}

export default connect(mapStateToProps)(SingleFantasyTeamPage)
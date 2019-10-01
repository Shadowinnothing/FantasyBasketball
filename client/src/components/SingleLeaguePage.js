import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const SingleLeaguePage = ({ match, usersLeagues }) => {

    const [league, setLeague] = useState()

    const redirectRoute = `/leagues/${match.params.leagueId}/createTeam`

    useEffect(() => {
        if(usersLeagues.length) 
            setLeague( usersLeagues.filter(leg => leg._id === match.params.leagueId )[0] )
    }, [usersLeagues])

    if(league) {
        console.log(league)
        return (
            <div>
                <h3>League Name: { league.leagueName }</h3>
                <h4>League Type: { league.leagueType }</h4>
                <h4>League Managers: { league.leagueManagers.map(({ id }) => {
                    console.log(id)
                    return (
                        <p key={ id }>{ id }</p>
                    )
                })}</h4>

                <div>
                    <h2>No team? Create one now!</h2>
                    <Link to={ redirectRoute }>
                        <button>Create Team</button>
                    </Link>
                </div>
            </div>
        )
    }
    return <div>Placeholder</div>
}

const mapStateToProps = state => {
    return {
        usersLeagues: state.Leagues.usersLeagues
    }
}

export default connect(mapStateToProps)(SingleLeaguePage)
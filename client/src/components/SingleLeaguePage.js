import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

const SingleLeaguePage = ({ match, usersLeagues }) => {

    const [league, setLeague] = useState()

    useEffect(() => {
        if(usersLeagues.length) 
            setLeague( usersLeagues.filter(leg => leg._id === match.params.id )[0] )
    }, [usersLeagues])

    if(league)
    return (
        <div>
            <h3>League Name: { league.leagueName }</h3>
            <h4>League Type: { league.leagueType }</h4>
            <h4>League Managers: { league.leagueManagers.map(lm => <p key={ lm }>{ lm }</p>) }</h4>
        </div>
    )
    return <div>Placeholder</div>
}

const mapStateToProps = state => {
    return {
        usersLeagues: state.Leagues.usersLeagues
    }
}

export default connect(mapStateToProps)(SingleLeaguePage)
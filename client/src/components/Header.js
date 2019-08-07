import React from 'react'
import { Link } from 'react-router-dom'

import { teamNames } from '../utils/getTeamName'

const githubCodeUrl = 'https://github.com/Shadowinnothing/FantasyBasketball'

// Returns array of Link tagged Team names
// Takes the user to /teams/{team_Name} 
const renderTeams = () => {
    return teamNames.map(({ name, teamId }) => <Link className="item" key={ teamId } to={`/teams/${ name.replace(/\s/g, "_") }`} >{ name }</Link>)
}

const Header = props => {
    return (
        <div className="ui menu">
            <Link className="header item" to="/">
                Haig/Turley Fantasy Hoops
            </Link>
            <div className="ui simple dropdown item">
                Teams
                <i className="dropdown icon"></i>
                <div className="menu">
                    { renderTeams() }
                </div>
            </div>
            <Link className="item" to="/playerSearch">
                Search By Last Name
            </Link>
            <a className="item" href={ githubCodeUrl }>
                Source Code!
            </a>
        </div>
    )
}

export default Header

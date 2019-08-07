import React from 'react'
import { Link } from 'react-router-dom'

import { teamNames } from '../utils/getTeamName'

const githubCodeUrl = 'https://github.com/Shadowinnothing/FantasyBasketball'

const renderTeams = () => {
    //const nums = Array.from(Array(32).keys())
    // Remove 0 because this is a stupid 1 based list
    //nums.shift()
    //return nums.map(num =>  )
    return teamNames.map(({ name, teamId }) => <div className="item" key={teamId} >{ name }</div>)
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
            <a className="item" href={ githubCodeUrl }>
                Source Code!
            </a>
            <Link className="item" to="/playerSearch">
                Search By Last Name
            </Link>
        </div>
    )
}

export default Header

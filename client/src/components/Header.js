import React from 'react'

import { teamNames } from '../utils/getTeamName'

const githubCodeUrl = 'https://github.com/Shadowinnothing/FantasyBasketball'

const renderTeams = () => {
    const nums = Array.from(Array(32).keys())
    // Remove 0 because this is a stupid 1 based list
    nums.shift()
    return nums.map(num => <div className="item" key={teamNames[num]} >{ teamNames[num] }</div> )
}

const Header = props => {
    return (
        <div className="ui menu">
            <div className="header item">
                Haig/Turley Fantasy Hoops
            </div>
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
            <a className="item" href="/">
                Locations
            </a>
        </div>
    )
}

export default Header

import React from 'react'

const TeamPage = props => {
    return (
        <div>
            <h1>{ props.match.params.teamName }</h1>
        </div>
    )
}

export default TeamPage

import React from 'react'

import StyledPlayerCard from '../styles/PlayerCard_style'

const PlayerCard = props => {
    const { player } = props

    if(player.leagues.standard) {
        return (
            <StyledPlayerCard
                className="card"
                onClick={ () => console.log(player.firstName) } 
            >
                <div className="content">
                    <h4 className="header" >{ player.firstName } { player.lastName }</h4> 
                    <h5>Team: { player.teamName }</h5>
                    <h5>Position: { player.leagues.standard ? player.leagues.standard.pos : '' }</h5>
                    <i className="address card icon">Undrafted</i>
                    <p className=""></p>
                </div>

            </StyledPlayerCard>
        )
    }
    else
        return ( <div></div> )
    
}

export default PlayerCard

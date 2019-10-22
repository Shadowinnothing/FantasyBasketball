import React from 'react'
import styled from 'styled-components'

//import StyledPlayerCard from '../styles/PlayerCard_style'

const StyledPlayerCard = styled.div`
    border: 1px solid black;
    content-align: center;
    height: 50px;
    width: 400px;
`

const PlayerCard = ({ player }) => {
    if(player.leagues.standard) {
        return (
            <StyledPlayerCard
                className="card"
                onClick={ () => console.log(player) } 
            >
                <tr>
                    <td data-label="Name">{ player.firstName } { player.lastName }</td>
                    <td data-label="Team">{ player.teamData.city }</td>
                    <td data-label="Position">{ player.leagues.standard ? player.leagues.standard.pos : '' }</td>
                </tr>
            </StyledPlayerCard>
        )
    }
    else
        return ( <div></div> )
    
}

export default PlayerCard

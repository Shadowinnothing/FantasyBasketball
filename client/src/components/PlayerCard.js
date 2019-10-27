import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'

import { signNewContract } from '../redux/actions'

//import StyledPlayerCard from '../styles/PlayerCard_style'

const StyledPlayerCard = styled.div`
    border: 1px solid black;
    content-align: center;
    height: 50px;
    width: 400px;
`

const PlayerCard = ({ player, signNewContract, leagueId, team, usersTeams }) => {
    console.log(team)

    if(player.leagues.standard) {
        return (
            <StyledPlayerCard
                className="card"
                onClick={ () => signNewContract({
                    experationDate: moment().endOf('day'),
                    contractSalary: player.playerPrice,
                    freeAgent: "UFA",
                    
                    leagueId: leagueId,
                    teamOwnerId: team._id,
                    
                    playerId: player.playerId,
                    teamId: player.teamId,
                    lastName: player.lastName,
                    firstName: player.firstName
                })} 
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

const mapStateToProps = state => {

    const usersTeams = state.FantasyTeams.usersTeams ? state.FantasyTeams.usersTeams : '' 

    return {
        usersTeams
    }
}

export default connect(mapStateToProps, { signNewContract })(PlayerCard)

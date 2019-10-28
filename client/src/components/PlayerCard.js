import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'

import { signNewContract, loadUsersFantasyTeams } from '../redux/actions'

//import StyledPlayerCard from '../styles/PlayerCard_style'

const StyledPlayerCard = styled.div`
    border: 1px solid black;
    content-align: center;
    height: 50px;
    width: 400px;
`

const PlayerCard = ({ player, signNewContract, leagueId, team, usersTeams, loadUsersFantasyTeams, userToken }) => {
    if(player.leagues.standard) {
        return (
            <StyledPlayerCard
                className="card"
                onClick={ () => {
                    signNewContract({
                        experationDate: moment().endOf('day'),
                        contractSalary: player.playerPrice,
                        freeAgent: "UFA",
                        
                        leagueId: leagueId,
                        teamOwnerId: team.teamOwner,
                        fantasyTeamId: team._id,
                        
                        playerId: player.playerId,
                        teamId: player.teamId,
                        lastName: player.lastName,
                        firstName: player.firstName
                    })

                    //loadUsersFantasyTeams({ userToken })
                }} 
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
        userToken: state.Auth.token,
        usersTeams
    }
}

export default connect(mapStateToProps, { signNewContract, loadUsersFantasyTeams })(PlayerCard)

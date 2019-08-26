import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
//import axios from 'axios'

const CreateLeagueSpan = styled.div`
    border: 1px solid black;
    line-height: 20%;
    margin: 5px;
`

const StyledLink = styled.button`
    background: #3a7a67;
    width: 150px;
    height: 50px;
    text-align: center;
`

const LeaguesPage = ({ usersLeagues, user, isAuthenticated, history }) => {

    const [ allUserLeagues, setAllUsersLeagues ] = useState([])

    useEffect(() => {
        setAllUsersLeagues(usersLeagues)
    }, [])

    useEffect(() => {
        setAllUsersLeagues(usersLeagues)
    }, [isAuthenticated, usersLeagues, user])

    const renderAllUserTeams = () => {
        return allUserLeagues.map(({ leagueName, leagueType, _id }) => {
            return (
                <tr key={ _id } onClick={ () => history.push(`/leagues/${_id}`) }>
                    <td data-label="Team Name">Team Name Here</td>
                    <td data-label="League Name">{ leagueName }</td>
                    <td data-label="League Type">{ leagueType }</td>
                </tr>
            )
        })
    }

    if(!isAuthenticated) {
        return <div>You Need to be authed to use this page</div>
    }

    return (
        <div>
            { 
                !allUserLeagues.length
                ?   
                    <CreateLeagueSpan>
                        <h4>Not a member of a league? Start one today!</h4>
                        <StyledLink><Link to="/createLeague">Create New League</Link></StyledLink>
                    </CreateLeagueSpan>
                :
                    <div>
                        <h2>{ user.name }, here are your fantasy teams</h2>
                        <table className="ui celled table">
                            <thead>
                                <tr><th>Team Name</th>
                                <th>League Name</th>
                                <th>League Type</th>
                            </tr></thead>
                            <tbody>
                                { renderAllUserTeams() }
                            </tbody>
                        </table>
                        <StyledLink><Link to="/createLeague">Create New League</Link></StyledLink>
                    </div>
                }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        user: state.Auth.user,
        usersLeagues: state.Leagues.usersLeagues
    }
}

export default connect(mapStateToProps)(LeaguesPage)
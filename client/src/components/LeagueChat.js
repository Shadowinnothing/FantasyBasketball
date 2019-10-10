import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { loadLeagueMessages } from '../redux/actions'

const LeagueChatBody = styled.div`
    border-color: black;
    border-style: solid;
    border-width: 5px;
    width: 500px;
`

const renderLeagueMessages = ( leagueMessages ) => {
    return leagueMessages.map(message => {
        return (
            <div className="ui segment" key={message.timeMessageSent} >
                <h4>{ message.userName }</h4>
                <p>{ message.messageText }</p>
                <p>{ message.timeMessageSent }</p>
            </div>
        )
    })
}

const LeagueChat = ({ userToken, currentLeague, loadLeagueMessages, allLeagueMessages }) => {

    useEffect(() => {
        loadLeagueMessages({ userToken, leagueId: currentLeague._id })
    }, [])

    return (
        <LeagueChatBody>
            <div className="ui segments">
                { allLeagueMessages ? renderLeagueMessages(allLeagueMessages) : '' }
            </div>

            <div className="ui input">
                <input type="text" placeholder="Search..." />
            </div>
            
        </LeagueChatBody>
    )
}

const mapStateToProps = state => {
    return {
        userToken: state.Auth.token,
        allLeagueMessages: state.Leagues.leagueMessages
    }
}

export default connect(mapStateToProps, { loadLeagueMessages })(LeagueChat)

import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Moment from 'react-moment'
import { connect } from 'react-redux'

import { loadLeagueMessages, sendLeagueMessage } from '../redux/actions'

const LeagueChatBody = styled.div`
    border-color: black;
    border-style: solid;
    border-width: 5px;
    width: 500px;
`

const renderLeagueMessages = ( leagueMessages ) => {
    return leagueMessages.map(message => {
        return (
            <div className="ui segment" key={message.messageText} >
                <p>{ message.userName } (<Moment format="HH:mm">{ message.timeMessageSent }</Moment>): { message.messageText }</p>
            </div>
        )
    })
}

const getLeagueMessages = async ({ userToken, leagueId, loadLeagueMessages }) => {
    return await loadLeagueMessages({ userToken, leagueId })
}

const LeagueChat = ({ userToken, currentLeague, loadLeagueMessages, allLeagueMessages, sendLeagueMessage, userName }) => {

    const [ messageToSend, setMessageToSend ] = useState()

    useEffect(() => {
        loadLeagueMessages({ userToken, leagueId: currentLeague._id })
    }, [])

    return (
        <LeagueChatBody>
            <div className="ui segments">
                { allLeagueMessages ? renderLeagueMessages(allLeagueMessages) : '' }
            </div>

            <form onSubmit={ e => {
                e.preventDefault()
                sendLeagueMessage({ messageText: messageToSend, leagueId: currentLeague._id, userName })
            }}>
                <div>
                    <input
                        type="message"
                        name="message"
                        placeholder="Send Message..."
                        value={ messageToSend }
                        onChange={ e => setMessageToSend(e.target.value)}
                    />
                </div>
            </form>
            <button
                onClick={ () => getLeagueMessages({ userToken, leagueId: currentLeague._id, loadLeagueMessages }) }
            >
                Press to Load Messages
            </button>
        </LeagueChatBody>
    )
}

const mapStateToProps = state => {
    return {
        userToken: state.Auth.token,
        userName: state.Auth.user.screenName,
        allLeagueMessages: state.Leagues.leagueMessages
    }
}

export default connect(mapStateToProps, { loadLeagueMessages, sendLeagueMessage })(LeagueChat)

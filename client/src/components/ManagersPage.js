import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'

const ManagersPage = ({ userToken, usersFriends, usersTeams, match, userId }) => {

    const [ userTeam, setUserTeam ] = useState()
    const [ friendsList, setFriendsList ] = useState()

    useEffect(() => {
        loadFriends()
            .then(res => setFriendsList(res))
    }, [ usersFriends ])

    // save user's team to state
    useEffect(() => {
        if(usersTeams.length)
            setUserTeam( usersTeams.filter(team => team.leagueId === match.params.leagueId)[0] )
    }, [usersTeams])

    // returns jsx of an array of friend list items
    const renderFriendList = () => {
        if(friendsList !== undefined && friendsList.length){
            return friendsList.map( friend => 
                <li 
                    onClick={ async () => {
    
                        // need to move this to the backend
    
                        const config = {
                            headers: { "authtoken" : userToken }
                        }
    
                        const data = await axios.post('/api/league/addTeamOwner', {
                            "leagueId": match.params.leagueId,
                            "newOwnerUserId": friend._id,
                            "leagueManagerId": userId,
                            "leagueManagerTeamId": userTeam._id
                        }, config)
    
                        console.log(data)
                    }}
                    key={ friend.name }
                >
                    { friend.name }
                </li>
            )
        } 
    }

    const loadFriends = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const friendsData = await axios.get(`/api/users/friends/getAll/${ userId }`)
                resolve(friendsData.data.allFriendsData)
            } catch(err) {
                console.log(err)
                reject(err)
            }
        })
    }

    // render each setting that is editable 1 by 1 to clean code
    const renderInputBox =  () => {

    }

    return (
        <div>
            <ul>{ renderFriendList() }</ul>

            { /*
                divisions - numberOfDivisions, division names
                draft - allowDraftPickTrading, draftTime, draftType, draftOrder, timePerPick
            */ }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.Auth.user._id,
        usersLeagues: state.Leagues.usersLeagues,
        usersTeams: state.FantasyTeams.usersTeams,
        usersFriends: state.Auth.user.friends,
        userToken: state.Auth.token,
        isAuthenticated: state.Auth.isAuthenticated
    }
}

export default connect( mapStateToProps )( ManagersPage )

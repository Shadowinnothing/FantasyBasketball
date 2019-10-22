import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

const StyledUserCard = styled.div`
        background: #4b637a;
        border: 1px solid black;
        content-align: center;
        margin: 5px;
        padding: 20px;
        width: 33vh;
        height: 100px;
`

const AddFriendButton = styled.button`
        background: #87b5e0;
        width: 100px;
        position: absolute;
        margin: 5px;
`

const FriendsList = styled.ul`
    
`

const SocialHomePage = ({ isAuthenticated, userToken, usersFriends, userId }) => {

    const [ usersSearched, setUsersSearched ] = useState([])
    const [ searchTerm, setSearchTerm ] = useState("")
    const [ friendsList, setFriendsList ] = useState()

    useEffect(() => {
        loadFriends()
            .then(res => setFriendsList(res))
    }, [ usersFriends ])

    // grab user's friends data from the db
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

    const onSubmit = async e => {
        e.preventDefault()

        const config = {
            headers: { "authtoken" : userToken }
        }

        const data = await axios.post('/api/users/search', { searchTerm }, config)

        if(!data.data.users.length) {
            setUsersSearched([{
                screenName: `User ${searchTerm} Not Found`
            }])
            return
        }

        setUsersSearched(data.data.users)
    }

    const addFriend = async newFriendUserId => {
        await axios.post(`/api/users/friends/add`, {
            "userAddingFriendId": userId,
	        "friendBeingAddedId": newFriendUserId
        })
        loadFriends()
            .then(res => setFriendsList(res))
    }

    // Redirect if not logged in
    if(!isAuthenticated){
        return <Redirect to="/" />
    }

    const renderUsers = () => {
        return usersSearched.map(user => {
            return ( 
                <StyledUserCard key={ user.screenName } >
                    <h4 className="header" >{ user.screenName }</h4>
                    {
                        user.screenName.includes('Not Found') 
                            ? ''
                            : <AddFriendButton onClick={ () => addFriend(user._id) }>Add Friend</AddFriendButton>
                    }
                </StyledUserCard>
            )
        })
    }

    const renderFriendsList = () => {
        if(friendsList.length){
            return friendsList.map( friend => {
                return <li key={ friend.name }>{ friend.name }</li>
            })
        }
    }

    return (
        <Fragment>
            <div>
                Friends List
                <FriendsList>
                    { friendsList !== undefined ? renderFriendsList() : 'No Friends' }
                </FriendsList>
            </div>

            <br />
            <br />

            <div>
                <form onSubmit={onSubmit}>
                    <label>
                        Search Users:
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <br />
                <br />

                <div className="ui cards">
                    {
                        renderUsers()
                    }
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {

    const usersFriends = state.Auth.user ? state.Auth.user.friends : ''
    const userId = state.Auth.user ? state.Auth.user._id : ''
    
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        userToken: state.Auth.token,
        usersFriends,
        userId
    }
}

export default connect(mapStateToProps)(SocialHomePage)

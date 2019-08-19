import React from 'react'
import styled from 'styled-components'

// only temporary for now
const StyledDiv = styled.div`
    border: 1px solid black;
`

const UserNavBar = props => {
    return (
        <StyledDiv>
            This navbar appears when the user is authenticated
        </StyledDiv>
    )
}

export default UserNavBar

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PlayerContractSigning from './PlayerContractSigning'
import PlayerSearchBar from './PlayerSearchBar'

const PlayerSearchSection = styled.div`
    width: 400px;
`

const DraftBoard = ({ match }) => {
    return (
        <>
            <PlayerSearchSection>
                <PlayerSearchBar match={ match } />
            </PlayerSearchSection>

            <PlayerContractSigning />
        </>
    )
}

const mapStateToProps = state => {
    return {
        
    }
}

export default connect( mapStateToProps, {} )(DraftBoard)

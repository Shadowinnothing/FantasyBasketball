import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PlayerSearchBar from './PlayerSearchBar'

const PlayerSearchSection = styled.div`
    width: 400px;
`

const DraftBoard = props => {
    return (
        <PlayerSearchSection>
            <PlayerSearchBar />
        </PlayerSearchSection>
    )
}

const mapStateToProps = state => {

}

export default connect( mapStateToProps, {} )(DraftBoard)

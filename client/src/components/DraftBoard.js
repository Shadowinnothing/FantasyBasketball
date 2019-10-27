import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PlayerSearchBar from './PlayerSearchBar'

const PlayerSearchSection = styled.div`
    width: 400px;
`

const DraftBoard = ({ match }) => {
    //console.log(match)
    return (
        <PlayerSearchSection>
            <PlayerSearchBar match={ match } />
        </PlayerSearchSection>
    )
}

const mapStateToProps = state => {

}

export default connect( mapStateToProps, {} )(DraftBoard)

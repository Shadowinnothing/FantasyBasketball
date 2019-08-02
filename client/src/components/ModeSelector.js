import React, { Component } from 'react'

import PlayerSearchBar from './PlayerSearchBar'

import { 
    DefaultButton,
    DefaultModeSelector
} from '../styles/Default'

export default class ModeSelector extends Component {

    state = {
        mode: undefined
    }

    render() {
        return (
            <div>
                <DefaultModeSelector>
                    <DefaultButton>Standard Mode</DefaultButton>
                    <DefaultButton>Dynsty Mode</DefaultButton>
                    <DefaultButton>Daily Fantasy Mode</DefaultButton>
                    <br />
                    <br />
                    <PlayerSearchBar />
                </DefaultModeSelector>
            </div>
        )
    }
}

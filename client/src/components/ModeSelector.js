import React, { Component } from 'react'

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
                    <h3>None of these buttons work lol</h3>
                    <DefaultButton>Standard Mode</DefaultButton>
                    <DefaultButton>Dynsty Mode</DefaultButton>
                    <DefaultButton>Daily Fantasy Mode</DefaultButton>
                </DefaultModeSelector>
            </div>
        )
    }
}

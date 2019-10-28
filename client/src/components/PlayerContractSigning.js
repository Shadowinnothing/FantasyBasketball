import React from 'react'
import styled from 'styled-components'

const Contract = styled.div`
    background: #bababa;
    position: absolute;
    left: 40%;
    top: 165px;
    height: 600px;
    width: 400px;
    border: 1px solid;
`

const ContractHeader = styled.h1`
    background: #595656;
    text-align: center;
    h1:after {
        position: absolute;
        left: 0;
        top: 50%;
        height: 1px;
        background: #c00;
        content: "";
        width: 100%;
        display: block;
    }
`

const Signature = styled.u`
    font-style: Snell Roundhand, cursive;
`

const PlayerContractSigning = props => {

    const player = {
        firstName: 'Nikola',
        lastName: 'Jokic'
    }

    return (
        <Contract>
            <ContractHeader>Player Contract</ContractHeader>
            <p>This contract states that player <u>{ player.firstName + ' ' + player.lastName }</u></p>
            <br />
            <p> has agreed to a <u>1</u> day, <u>$5000</u> contract</p>
            <br />
            <p>Signed with the <u>Washington Yeets</u></p>
            <br />
            <p>Washington Yeets Owner: <Signature>Ryan Haig</Signature></p>
            <br />
            <p>Free Agent Player: <Signature>Nikola Jokic</Signature></p>
            <button>Click Here to Pay the Man</button>
        </Contract>
    )
}

export default PlayerContractSigning

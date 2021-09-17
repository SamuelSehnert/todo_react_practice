import React from 'react'
import {Link} from 'react-router-dom'

import styled from 'styled-components'

const StyledHeaderFull = styled.div`
    display: flex;
    justify-content: space-evenly;

    border: solid black;

    padding: 15px;
    background-color: #D0D6FF;
`

export default function Header() {
    return (
        <StyledHeaderFull>
            <Link to='/' style={{color: 'black'}}>Home</Link>
            <Link to='/character-sheet' style={{color: 'black'}}>Character Sheet</Link>
            <Link to='/todo' style={{color: 'black'}}>Todo</Link>
        </StyledHeaderFull>
    )
}

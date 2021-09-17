import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import styled from 'styled-components'

const StyledHeaderFull = styled.div`
    display: flex;
    justify-content: space-evenly;

    border: solid black;

    padding: 15px;
    background-color: #D0D6FF;
`

const pages = ['/', '/todo', '/character-sheet']
const titles = ['Home', 'Todo', 'Character Sheet']

export default function Header() {
    const [active, setActive] = useState(pages[0])
    return (
        <StyledHeaderFull>
            {pages.map( page => {
                if (page === active) { 
                    return <Link to={page} key={page} onClick={() => setActive(pages[pages.indexOf(page)])} style={{textDecoration: 'none', color: 'black', 'borderStyle': 'hidden hidden solid hidden'}}>{titles[pages.indexOf(page)]}</Link>
                }
                else{
                    return <Link to={page} key={page} onClick={() => setActive(pages[pages.indexOf(page)])} style={{textDecoration: 'none', color: 'black'}}>{titles[pages.indexOf(page)]}</Link>
                }
            })}
        </StyledHeaderFull>
    )
}

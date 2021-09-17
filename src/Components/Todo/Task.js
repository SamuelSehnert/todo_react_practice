import React from 'react'

import styled from 'styled-components'

const StyledClickable = styled.div`
    cursor: pointer;
`

export default function Task ({handleSelectedTask, taskData}) {

    function messageText(string){
        if (string.length > 20 ){
            return string.slice(0, 20) + '...'
        }
        else{
            return string
        }
    }

    return(
        <StyledClickable onClick={() => handleSelectedTask(taskData)}>
            <strong>{messageText(taskData.title)}</strong>
            <div>{messageText(taskData.context)}</div>
            <br/>
        </StyledClickable>
    );
}

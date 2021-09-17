import React, {useState} from 'react'
import Task from './Task'

import styled from 'styled-components';

const StyledBorder = styled.div`
    border: 1px solid black;
`
const StyledTitle = styled.div`
    cursor: pointer;
`
const StyledInput = styled.input`
    text-align: center;
`
const StyleModalContent = styled.div`
    position: relative;
`
const StyledOverlay = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
`


const Group = ({groupData, handleSelectedTask, exitEditGroup}) => {

    const [editGroup, setEditGroup] = useState(false);
    const [groupStuff, setGroupStuff] = useState(groupData.title);

    const toggleEditGroup = () => {
        setEditGroup(!editGroup)
    }

    const update = e => {
        setGroupStuff(e.target.value);
    }

    function messageText(string){
        if (string.length > 10 ){
            return string.slice(0, 10) + '...'
        }
        else{
            return string
        }
    }

    function isEmpty(string){
        return !string.trim();
    }

    function conditionalEdit(bool){
        if (bool){
            return (
                <div>
                    <StyledOverlay onClick={() =>  toggleEditGroup()} ></StyledOverlay>
                    <StyleModalContent>
                        <StyledInput type='text' name='title' onChange={update} defaultValue={groupData.title} style={{width: String(groupStuff.length + 1) +'ch'}} ></StyledInput>
                        <div>
                            <button onClick={() => {if(!isEmpty(groupStuff)){ exitEditGroup(groupStuff, 2, groupData.title); toggleEditGroup()}}}>Save</button>
                            <button onClick={() => {exitEditGroup(groupData.title, 1); toggleEditGroup()}}>Delete</button>
                        </div>
                    </StyleModalContent>
                </div>
            )
        }
        else{
            return <h2 onClick={() => toggleEditGroup()}>{messageText(groupData.title)}</h2>
        }
    }

    return(
        <StyledBorder>
            <StyledTitle>{conditionalEdit(editGroup)}</StyledTitle>
            {groupData.tasks.map( task => {
                return <Task handleSelectedTask={handleSelectedTask} key={task.taskID} taskData={task} />
            })}
        </StyledBorder>
    );
}

export default Group;
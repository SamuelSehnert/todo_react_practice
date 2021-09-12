import React, {useState} from 'react'
import Task from './Task'

import './../Style/Group.module.css'

const Group = ({groupData, handleSelectedTask, exitEditGroup}) => {

    const [editGroup, setEditGroup] = useState(false);
    const [groupStuff, setGroupStuff] = useState('');

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

    function conditionalEdit(bool){
        if (bool){
            return (
                <div>
                    <input type='text' name='title' onChange={update} defaultValue={groupData.title}></input>
                    <div>
                        <button onClick={() => {exitEditGroup(groupStuff, 2, groupData.title); toggleEditGroup()}}>Save</button>
                        <button onClick={() => {exitEditGroup(groupData.title, 1); toggleEditGroup()}}>Delete</button>
                    </div>
                </div>
            )
        }
        else{
            return <h2 onClick={() => toggleEditGroup()}>{messageText(groupData.title)}</h2>
        }
    }

    return(
        <div className='border'>
            <div>{conditionalEdit(editGroup)}</div>
            {groupData.tasks.map( task => {
                return <Task handleSelectedTask={handleSelectedTask} key={task.taskID} taskData={task} />
            })}
        </div>
    );
}

export default Group;
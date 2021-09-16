import React, {useState} from 'react'
import Task from './Task'

import './../../Style/Group.module.css'

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
                <div className='modal2'>
                    <div onClick={() =>  toggleEditGroup()} className="overlay2"></div>
                    <div className='modal-content2'>
                        <input className='input' type='text' name='title' onChange={update} defaultValue={groupData.title} style={{width: String(groupStuff.length + 1) +'ch'}} ></input>
                        <div>
                            <button onClick={() => {if(!isEmpty(groupStuff)){ exitEditGroup(groupStuff, 2, groupData.title); toggleEditGroup()}}}>Save</button>
                            <button onClick={() => {exitEditGroup(groupData.title, 1); toggleEditGroup()}}>Delete</button>
                        </div>
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
            <div className='title'>{conditionalEdit(editGroup)}</div>
            {groupData.tasks.map( task => {
                return <Task handleSelectedTask={handleSelectedTask} key={task.taskID} taskData={task} />
            })}
        </div>
    );
}

export default Group;
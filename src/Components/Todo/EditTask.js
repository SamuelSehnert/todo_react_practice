import React, {useState} from 'react'

import './../../Style/EditTask.module.css'

const EditTask = ({exitEditTask, taskData, exitEditGroup, groupData}) => {

    const [newTask, setNewTask] = useState(taskData);

    const [newGroup, setNewGroup] = useState('');
    const [showNewGroupForm, setShowNewGroupForm] = useState(false);
    const [showInvalid, setShowInvalid] = useState([false, false]);

    const updateTaskData = e => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        })
    }

    const updateGroupData = e => {
        setNewGroup(e.target.value)
    }

    const messageString = (string) => {
        if (string.length > 20){
            return string.slice(0, 20) + '...'
        }
        return string
    }

    function isEmpty(string){
        return !string.trim();
    }

    function showGroupForm(showNewGroupForm){
        if (showNewGroupForm){
            return (
                <div className='fullSection'>
                    <span>
                        <input type='text' name='groupID' onChange={updateGroupData} />
                        <button onClick={() => {
                            if (!isEmpty(newGroup)){
                                exitEditGroup(newGroup, 0);
                                setShowNewGroupForm(!showNewGroupForm);
                                setShowInvalid([showInvalid[0], false]);
                            }
                            else{
                                setShowInvalid([showInvalid[0], true]);
                            }
                            }}>Save Group</button>
                    </span>
                </div>
                )
        }
        else{
            return
        }
    }

    function submissionNotValidReturn(showInvalid){
        if (showInvalid){
            return (<div className='invalid-submission'>Title and Context must have data!</div>)
        }
    }

    function groupNotValid(showInvalid){
        if (showInvalid){
            return (<div className='invalid-submission'>Group can't be empty string</div>) 
        }
    }

    return(
        <div className='fullSection'>
            <div>
                <strong>Title</strong><br/>
                <input className='title-input' type='text' name='title' onChange={updateTaskData} defaultValue={taskData.title}/>
            </div>
            <div>
                <strong>Context</strong><br/>
                <textarea className='context-input' type='text' name='context' onChange={updateTaskData} defaultValue={taskData.context}/>
            </div>
            {submissionNotValidReturn(showInvalid[0])}
            <div>
                <label>Move Task </label>
                <select id='section-select' name='sectionID' defaultValue={taskData.sectionID} onChange={updateTaskData}>
                    <option value='not-started'>Not Started</option>
                    <option value='in-progress'>In Progress</option>
                    <option value='complete'>Complete</option>
                </select>
            </div>
            <div>
                <label>Change Group </label>
                <select id='section-select' name='groupID' defaultValue={taskData.groupID} onChange={updateTaskData}>
                    <option value={null}>Ungrouped</option>
                    {groupData.map(group => {
                        return <option key={group} value={group}>{messageString(group)}</option>
                    })}
                </select>
                <button onClick={() => setShowNewGroupForm(!showNewGroupForm)}>New Group</button>
                {showGroupForm(showNewGroupForm)}
            </div>
            {groupNotValid(showInvalid[1])}
            <button onClick={() => {
                if (!isEmpty(newTask.title) && !isEmpty(newTask.context)){
                    exitEditTask(newTask, 0); 
                    setShowInvalid([false, showInvalid[1]])
                }
                else {
                    setShowInvalid([true, showInvalid[1]])
                }
            }}>Save & Close</button>
            <button onClick={() => exitEditTask(newTask, 1)}>Delete Task</button>
        </div>
    );
}

export default EditTask;
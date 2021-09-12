import React, {useState} from 'react'

import './../Style/EditTask.module.css'

const EditTask = ({exitEditTask, taskData, exitEditGroup, groupData}) => {

    const [newTask, setNewTask] = useState(taskData);

    const [newGroup, setNewGroup] = useState('');
    const [showNewGroupForm, setShowNewGroupForm] = useState(false);

    const updateTaskData = e => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        })
    }

    const updateGroupData = e => {
        setNewGroup(e.target.value)
    }

    function showGroupForm(showNewGroupForm){
        if (showNewGroupForm){
            return (
                <span>
                    <input type='text' name='groupID' onChange={updateGroupData} />
                    <button onClick={() => {
                        exitEditGroup(newGroup, 0);
                        setShowNewGroupForm(!showNewGroupForm);
                        }}>Save Group</button>
                </span>)
        }
        else{
            return
        }
    }

    return(
        <div className='fullSection'>
            <div>
                Title<br/>
                <input type='text' name='title' onChange={updateTaskData} defaultValue={taskData.title}/>
            </div>
            <div>
                Context<br/>
                <input type='text' name='context' onChange={updateTaskData} defaultValue={taskData.context}/>
            </div>
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
                        return <option key={group} value={group}>{group}</option>
                    })}
                </select>
                <button onClick={() => setShowNewGroupForm(!showNewGroupForm)}>New Group</button>
                {showGroupForm(showNewGroupForm)}
            </div>
            <button onClick={() => exitEditTask(newTask, 0)}>Save & Close</button>
            <button onClick={() => exitEditTask(newTask, 1)}>Delete Task</button>
        </div>
    );
}

export default EditTask;
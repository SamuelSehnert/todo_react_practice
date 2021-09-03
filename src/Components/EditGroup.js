import React, { useState } from 'react'

export default function EditGroup({Exit, groupData}) {

    const [newGroup, setNewGroup] = useState(groupData)

    const updateGroupData = e => {
        setNewGroup({
            ...newGroup,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div>
            <div>
                Group Name
                <input type='text' name='title' onChange={updateGroupData} defaultValue={groupData.groupTitle}/>
            </div>
            {/* <div>
                <label>Move Task </label>
                <select id='section-select' name='sectionID' defaultValue={taskData.sectionID} onChange={updateTaskData}>
                    <option value='not-started'>Not Started</option>
                    <option value='in-progress'>In Progress</option>
                    <option value='complete'>Complete</option>
                </select>
            </div>
            <button onClick={() => saveData()}>Save & Close</button>
            <button onClick={() => deleteData()}>Delete Task</button> */}
        </div>
    )
}

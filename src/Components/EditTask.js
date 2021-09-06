import React, {useState} from 'react'

const EditTask = ({exitEditTask, taskData, exitEditGroup, groupData}) => {

    const [newTask, setNewTask] = useState(taskData);

    const [newGroup, setNewGroup] = useState('');
    const [showNewGroupForm, setShowNewGroupForm] = useState(false);

    const saveData = () => {
        exitEditTask(newTask, 0)
    }

    const deleteData = () => {
        exitEditTask(newTask, 1)
    }

    const updateTaskData = e => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        })
    }

    const updateGroupData = e => {
        setNewGroup(e.target.value)
    }

    const saveGroupData = () => {
        exitEditGroup(newGroup, 0);
    }

    function showGroupForm(showNewGroupForm){
        if (showNewGroupForm){
            return (
                <span>
                    <input type='text' name='groupID' onChange={updateGroupData} />
                    <button onClick={() => {
                        saveGroupData();
                        setShowNewGroupForm(!showNewGroupForm)
                        }}>Save Group</button>
                </span>)
        }
        else{
            return
        }
    }

    function messageString(string){
        var retString = '';
        for (let i = 0; i < string.length; i++) {
            const element = string[i];
            if (element === ' '){
                retString += '-'
            }
            else{
                retString += element.toLowerCase();
            }
        }
        return retString;
    }

    return(
        <div>
            <div>
                Title
                <input type='text' name='title' onChange={updateTaskData} defaultValue={taskData.title}/>
            </div>
            <div>
                Context
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
                        return <option key={messageString(group)} value={messageString(group)}>{group}</option>
                    })}
                </select>
                <button onClick={() => setShowNewGroupForm(!showNewGroupForm)}>New Group</button>
                {showGroupForm(showNewGroupForm)}
            </div>
            <button onClick={() => saveData()}>Save & Close</button>
            <button onClick={() => deleteData()}>Delete Task</button>
        </div>
    );
}

export default EditTask;
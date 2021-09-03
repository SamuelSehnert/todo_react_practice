import React, {useState} from 'react'

const EditTask = ({ExitEditTask, taskData}) => {

    const [newTask, setNewTask] = useState(taskData);

    const saveData = () => {
        ExitEditTask(newTask, 0)
    }

    const deleteData = () => {
        ExitEditTask(newTask, 1)
    }

    const updateTaskData = e => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        })
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
            <button onClick={() => saveData()}>Save & Close</button>
            <button onClick={() => deleteData()}>Delete Task</button>
        </div>
    );
}

export default EditTask;
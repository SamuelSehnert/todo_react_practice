import React, {useState} from 'react';

const EditTask = ({saveTaskAndExit, taskData}) => {

    const [newTask, setNewTask] = useState(taskData);

    const saveData = () => {

        saveTaskAndExit(newTask)
    }

    const updateTaskData = e => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        })
        // console.log(newTask)
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
                <select>
                    <option value='not-started'>Not Started</option>
                    <option value='in-progress'>In Progress</option>
                    <option value='complete'>Complete</option>
                </select>
            </div>
            <button onClick={() => saveData()}>Save & Close</button>
        </div>
    );
}

export default EditTask;
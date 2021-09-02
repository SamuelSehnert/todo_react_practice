import React from 'react';

const EditTask = ({handleShowEditTask, taskData}) => {

    return(
        <div>
            <div>
                Title
                <input type='text' name='task-title'/>
            </div>
            <div>
                Context
                <input type='text' name='task-context'/>
            </div>
            <div>
                <label>Move Task </label>
                <select>
                    <option value='not-started'>Not Started</option>
                    <option value='in-progress'>In Progress</option>
                    <option value='complete'>Complete</option>
                </select>
            </div>
            <button onClick={() => handleShowEditTask()}>Save & Close</button>
        </div>
    );
}

export default EditTask;
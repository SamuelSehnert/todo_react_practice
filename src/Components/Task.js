import React from 'react'

const Task = ({handleSelectedTask, taskData}) => {

    return(
        <div onClick={() => handleSelectedTask(taskData)}>
            <strong>{taskData.title}</strong>
            <div>{taskData.context}</div>
            <br/>
        </div>
    );
}

export default Task;
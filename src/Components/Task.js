import React from 'react'

import './../Style/Task.module.css'

const Task = ({handleSelectedTask, taskData}) => {

    return(
        <div className='clickable' onClick={() => handleSelectedTask(taskData)}>
            <strong>{taskData.title}</strong>
            <div>{taskData.context}</div>
            {/* <div>{taskData.groupID}</div> */}
            <br/>
        </div>
    );
}

export default Task;
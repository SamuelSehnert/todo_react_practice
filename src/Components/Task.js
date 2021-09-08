import React from 'react'

const Task = ({handleSelectedTask, taskData}) => {

    return(
        <div onClick={() => handleSelectedTask(taskData)}>
            <strong>{taskData.title}</strong>
            <div>{taskData.context}</div>
            {/* <div>{taskData.groupID}</div> */}
            <br/>
        </div>
    );
}

export default Task;
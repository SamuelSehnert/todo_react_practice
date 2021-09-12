import React from 'react'

import './../Style/Task.module.css'

const Task = ({handleSelectedTask, taskData}) => {

    function messageText(string){
        if (string.length > 20 ){
            return string.slice(0, 20) + '...'
        }
        else{
            return string
        }
    }

    return(
        <div className='clickable' onClick={() => handleSelectedTask(taskData)}>
            <strong>{messageText(taskData.title)}</strong>
            <div>{messageText(taskData.context)}</div>
            <br/>
        </div>
    );
}

export default Task;
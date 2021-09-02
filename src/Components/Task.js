import React from 'react';

const Task = ({handleSelectedTask, taskData}) => {

    function showEditPopup(){
        handleSelectedTask(taskData) //calls back to main and displays the edit Task
    }

    return(
        <div onClick={() => showEditPopup()}>
            <strong>{taskData.title}</strong>
            <div>{taskData.context}</div>
            <br/>
        </div>
    );
}

export default Task;
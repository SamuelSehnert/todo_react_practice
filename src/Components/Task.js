import React from 'react';

const Task = ({taskData}) => {

    function showEditPopup(){
        //want to allow user to edit task
        console.log("taskID = " + taskData.taskID)
    }

    return(
        <div onClick={() => showEditPopup()}>
            <strong>{taskData.title}</strong>
            <div>{taskData.context}</div>
        </div>
    );
}

export default Task;
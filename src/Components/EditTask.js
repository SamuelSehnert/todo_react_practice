import React from 'react';

const EditTask = ({taskData}) => {

    return(
        <div>
            <span>
                Title
                <input type='text' name='task-title'/>
            </span>
            <span>
                Context
                <input type='text' name='task-context'/>
            </span>
        </div>
    );
}

export default EditTask;
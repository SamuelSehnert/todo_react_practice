import React from 'react'
import Task from './Task'

const Group = ({groupData, handleSelectedTask}) => {

    return(
        <div>
            <h2>{groupData.title}</h2>
            {groupData.tasks.map( task => {
                return <Task handleSelectedTask={handleSelectedTask} key={task.taskID} taskData={task} />
            })}
        </div>
    );
}

export default Group;
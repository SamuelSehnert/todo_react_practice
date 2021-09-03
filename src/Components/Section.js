import React, { useState } from 'react'
import Task from './Task'
import Group from './Group'

/* This for the the NOT STARTED, IN PROGRESS, and DONE section
 * Inputs:
 *      data -> JSON object
 */

const Section = ({handleSelectedTask, data, stringData}) => {

    const [groups, setGroups] = useState([])
    /* 
        {
            groupID: string
            tasks: []
        }
     */

    return(
        <div>
            <h1>{stringData.title}</h1>
            <div className='ungroupedTasks'>
            {data.map( task => {
                if (task.sectionID === stringData.id && task.groupID === null) { //task is ungrouped
                    return <Task handleSelectedTask={handleSelectedTask} key={task.taskID} taskData={task} />
                }
                else {
                    return null
                }
            })}
            </div>
        </div>
    );
}

export default Section;
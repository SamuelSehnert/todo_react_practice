import React from 'react'
import Task from './Task'

/* This for the the NOT STARTED, IN PROGRESS, and DONE section
 * Inputs:
 *      data -> JSON object
 */

const Section = ({handleSelectedTask, data, stringData}) => {

    return(
        <div>
            <h1>{stringData.title}</h1>
            <div>
            {data.map( task => {
                if (task.sectionID === stringData.id && task.groupID === 'Ungrouped') { //task is ungrouped
                    return <Task handleSelectedTask={handleSelectedTask} key={task.taskID} taskData={task} />
                }
                else { //task is grouped
                    return null
                }
            })}
            </div>
        </div>
    );
}

export default Section;
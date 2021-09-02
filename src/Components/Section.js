import React from 'react';
import Task from './Task'

/* This for the the NOT STARTED, IN PROGRESS, and DONE section
 * Inputs:
 *      data -> JSON object
 */

const Section = ({data, id}) => {

    return(
        <div>
            <h1>{id}</h1>
            <div>
            {data.ungroupedTasks.map( task => {
                if (task.sectionID === id) {
                    return <Task key={task.taskID} taskData={task}/>
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
import React from 'react'
import Task from './Task'
import Group from './Group'

/* This for the the NOT STARTED, IN PROGRESS, and DONE section
 * Inputs:
 *      data -> JSON object
 */

const Section = ({handleSelectedTask, data, stringData}) => {

    // const [fullTaskData, setFullTaskData] = useState(parseData());
    var tasks = [];

    function parseData(){
        const titles = [];

        const groups = [];
        const ungroupedTasks = [];

        data.forEach(task => {
            if (task.sectionID === stringData.id) { //if task belongs in this section
                if (task.groupID !== 'Ungrouped') { //if task is in group
                    const tempIndex = titles.indexOf(task.groupID); //find title in data
                    if (tempIndex !== -1){ //if task already in groups array
                        groups[tempIndex].push(task)
                    }
                    else{
                        titles.push(task.groupID);
                        groups.push([task])
                    }
                }
                else{
                    ungroupedTasks.push(task)
                }
            }
        });
        return [ungroupedTasks, groups]
    }

    function runAtStartInReturn(){
        tasks = parseData();
    }


    return(
        <div>
            <h1>{stringData.title}</h1>
            <div>
                {runAtStartInReturn()}
                {tasks[0].map( task => {
                    return <Task handleSelectedTask={handleSelectedTask} key={task.taskID} taskData={task} />
                })}
                {tasks[1].map( group => {
                    const tempData = {
                        title: group[0].groupID,
                        tasks: group
                    }
                    return <Group key={tempData.title} handleSelectedTask={handleSelectedTask} groupData={tempData}/>
                })}
            </div>
            {/* <button onClick={() => console.log(stringData.title + ': ' + fullTaskData)}>WMW</button> */}
        </div>
    );
}

export default Section;
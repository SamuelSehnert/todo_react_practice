import React, {useState} from 'react';
import Section from './Section';
import { uniqueId } from 'lodash';

const Main = () => {

    const [allData, setData] = useState({ 
        groups: [], //groups of tasks
        ungroupedTasks: [] //ungrouped tasks
    });

    function createTask(){
        setData({   
            groups: [...allData.groups],
            ungroupedTasks: [...allData.ungroupedTasks, {
                taskID: uniqueId(),
                title: 'Unnamed', //title of task
                context: 'No Text', //text of task
                sectionID: 'not-started', //section task is in. Default to 'not-started'
                groupID: null,
                timeStamp: null,}]
        })
    }

    return(
        <div>
            <Section id='not-started' data={allData}></Section>
            <Section id='in-progress' data={allData}></Section>
            <Section id='complete'    data={allData}></Section>

            <button onClick={() => createTask()}>New Task</button>
            {/* <ul>
                {allData.ungroupedTasks.map( task => <li>{task.title}</li> )}
            </ul> */}
        </div>
    );
}

export default Main;
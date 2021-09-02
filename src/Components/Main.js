import React, {useState} from 'react';
import Section from './Section';
import { uniqueId } from 'lodash';
import EditTask from './EditTask';

const Main = () => {

    const [allData, setData] = useState({ 
        groups: [], //groups of tasks
        ungroupedTasks: [] //ungrouped tasks
    });
    const [showEditTask, setShowEditTask] = useState(false); //state for choosing to render the edit task or the sections
    const [selectedTask, setSelectedTask] = useState({}) //state for the current task User is looking at

    //flip-flops between the popup for editing and the main page
    function handleShowEditTask(){
        setShowEditTask(!showEditTask)
    }
    //sets task and then shows popup
    //called in Task.js
    function handleSelectedTask(task){
        setSelectedTask(task);
        handleShowEditTask();
    }

    const renderDisplay = (showEditTask) => {
        if (showEditTask){
            return <EditTask handleShowEditTask={handleShowEditTask} taskData={selectedTask}/> 
        }
        else{
            return (
                <div>
                    <Section handleSelectedTask={handleSelectedTask} stringData={{id: 'not-started', title: 'Not Started'}} data={allData}></Section>
                    <Section handleSelectedTask={handleSelectedTask} stringData={{id: 'in-progress', title: 'In Progress'}} data={allData}></Section>
                    <Section handleSelectedTask={handleSelectedTask} stringData={{id: 'complete', title: 'Complete'}}       data={allData}></Section>
                    <button onClick={() => createTask()}>New Task</button>
                </div>
            )
        }
    }

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
            {renderDisplay(showEditTask)}
        </div>
    );
}

export default Main;
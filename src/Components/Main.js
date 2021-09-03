import React, {useState} from 'react';
import Section from './Section';
import { uniqueId } from 'lodash';
import EditTask from './EditTask';

const Main = () => {

    const [allData, setData] = useState([]);
    const [showEditTask, setShowEditTask] = useState(false); //state for choosing to render the edit task or the sections
    const [selectedTask, setSelectedTask] = useState({}) //state for the current task User is looking at

    //flip-flops between the popup for editing and the main page
    function handleShowEditTask(){
        setShowEditTask(!showEditTask)
    }

    function ExitEditTask(newTask, mode){
        allData.forEach( task => {
            if (task.taskID === newTask.taskID && mode === 0){
                task.title = newTask.title;
                task.context = newTask.context;
                task.sectionID = newTask.sectionID;
                task.groupID = newTask.groupID;
            }
            else if (task.taskID === newTask.taskID && mode === 1){
                allData.splice(allData.indexOf(newTask), 1)
            }
        })
        handleShowEditTask();
    }
    //sets task and then shows popup
    //called in Task.js
    function handleSelectedTask(task){
        setSelectedTask(task);
        handleShowEditTask();
    }

    const renderDisplay = (showEditTask) => {
        if (showEditTask){
            return <EditTask ExitEditTask={ExitEditTask} taskData={selectedTask}/> 
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
        setData([...allData, {
                taskID: uniqueId(),
                title: 'Unnamed', //title of task
                context: 'No Text', //text of task
                sectionID: 'not-started', //section task is in. Default to 'not-started'
                groupID: null,
                timeStamp: null,}
            ]
        )
    }

    return(
        <div>
            {renderDisplay(showEditTask)}
        </div>
    );
}

export default Main;
import React, {useState} from 'react'
import { uniqueId } from 'lodash'
import Section from './Section'
import EditTask from './EditTask'

const Main = () => {

    const [tasks, setTasks] = useState([]);
    const [groups, setGroups] = useState([]);
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

    function exitEditTask(newTask, mode){
        tasks.forEach( task => {
            if (task.taskID === newTask.taskID && mode === 0){ //saving a task
                task.title = newTask.title;
                task.context = newTask.context;
                task.sectionID = newTask.sectionID;
                task.groupID = newTask.groupID;
            }
            else if (task.taskID === newTask.taskID && mode === 1){ //deleting a task
                tasks.splice(tasks.indexOf(newTask), 1);
            }
        })
        handleShowEditTask();
    }

    function exitEditGroup(newGroup, mode){
        if (groups.find(group => group === newGroup) === undefined){ //making sure that groupnames aren't repeated
            setGroups([...groups, newGroup]);
        }
    }

    function createTask(){
        setTasks([...tasks, {
                taskID: uniqueId(),
                title: 'Unnamed', //title of task
                context: 'No Text', //text of task
                sectionID: 'not-started', //section task is in. Default to 'not-started'
                groupID: 'Ungrouped',
                timeStamp: null,}
            ]
        )
    }

    const renderDisplay = (showEditTask) => {
        if (showEditTask){
            return <EditTask exitEditTask={exitEditTask} taskData={selectedTask} exitEditGroup={exitEditGroup} groupData={groups}/> 
        }
        else{
            return (
                <div>
                    <Section handleSelectedTask={handleSelectedTask} stringData={{id: 'not-started', title: 'Not Started'}} data={tasks}></Section>
                    <Section handleSelectedTask={handleSelectedTask} stringData={{id: 'in-progress', title: 'In Progress'}} data={tasks}></Section>
                    <Section handleSelectedTask={handleSelectedTask} stringData={{id: 'complete', title: 'Complete'}}       data={tasks}></Section>
                    <button onClick={() => createTask()}>New Task</button>
                </div>
            )
        }
    }

    return(
        <span>
            {renderDisplay(showEditTask)}
        </span>
    );
}

export default Main;
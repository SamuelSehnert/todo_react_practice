import React, {useState} from 'react'
import { uniqueId } from 'lodash'
import Section from './Section'
import EditTask from './EditTask'

import './../Style/Main.module.css'

const Main = () => {

    const [tasks, setTasks] = useState([]);
    const [groups, setGroups] = useState([]);
    const [showEditTask, setShowEditTask] = useState(false); //state for choosing to render the edit task or the sections
    const [selectedTask, setSelectedTask] = useState({}) //state for the current task User is looking at
    const [groupEdit, setgroupEdit] = useState(false); //used to force re-render after group edit

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

    function exitEditGroup(newGroup, mode, original=''){
        setgroupEdit(!groupEdit)
        if (mode === 0) { //saving
            if (groups.find(group => group === newGroup) === undefined && newGroup !== ''){ //making sure that groupnames aren't repeated
                setGroups([...groups, newGroup]);
            }
        }
        else if (mode === 1){ //deleting
            groups.forEach( group => {
                if (group === newGroup) {
                    groups.splice(groups.indexOf(newGroup), 1);
                }
            })
            tasks.forEach( task => {
                if (task.groupID === newGroup) {
                    task.groupID = 'Ungrouped'
                }
            })
        }
        else if (mode === 2){
            groups.forEach( group => {
                if (group === original){
                    const tempGroup = groups;
                    tempGroup[groups.indexOf(group)] = newGroup;
                    setGroups(tempGroup)
                }
            })
            tasks.forEach( task => {
                if (task.groupID === original) {
                    task.groupID = newGroup;
                }
            })
        }
        setgroupEdit(!groupEdit)
    }

    function createTask(){
        const newTask = {
            taskID: uniqueId(),
            title: 'Unnamed', //title of task
            context: 'No Text', //text of task
            sectionID: 'not-started', //section task is in. Default to 'not-started'
            groupID: 'Ungrouped',
            timeStamp: null
        }
        setTasks([...tasks, newTask])
        handleSelectedTask(newTask)
    }

    function saveAllData(){

    }

    function get(){

    }

    const renderDisplay = (showEditTask) => {
        return (
            <div className='background'>
                <div className='main-division'>
                    <span><Section exitEditGroup={exitEditGroup} handleSelectedTask={handleSelectedTask} stringData={{id: 'not-started', title: 'Not Started'}} data={tasks}></Section></span>
                    <span><Section exitEditGroup={exitEditGroup} handleSelectedTask={handleSelectedTask} stringData={{id: 'in-progress', title: 'In Progress'}} data={tasks}></Section></span>
                    <span><Section exitEditGroup={exitEditGroup} handleSelectedTask={handleSelectedTask} stringData={{id: 'complete', title: 'Complete'}}       data={tasks}></Section></span>
                </div>
                <span className='button-span'>
                    <button className='button-new' onClick={() => createTask()}>New Task</button>
                    <button className='button-save' onClick={() => saveAllData()}>Save Data</button>
                    <button className='button-timer' onClick={() => get()}>Timer</button>
                </span>
                {showEditTask && (
                    <div className='modal'>
                        <div onClick={() => handleShowEditTask()} className="overlay"></div> {/* essentially the background, click to exit */}
                        <div className='modal-content'><EditTask exitEditTask={exitEditTask} taskData={selectedTask} exitEditGroup={exitEditGroup} groupData={groups}/> </div>
                    </div> 
                )}
            </div>
        )
    }

    return(
        <span>
            {renderDisplay(showEditTask)}
        </span>
    );
}

export default Main;
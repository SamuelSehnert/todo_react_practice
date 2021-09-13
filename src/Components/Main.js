import React, {useState, useEffect} from 'react'
import Section from './Section'
import EditTask from './EditTask'
import Pomodoro from './Pomodoro'

import './../Style/Main.module.css'
import EditPomodoro from './EditPomodoro'

const Main = () => {

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')));
    const [groups, setGroups] = useState(JSON.parse(localStorage.getItem('groups')));
    const [ID, setID] = useState(Number(localStorage.getItem('id')));

    const [timeData, setTimeData] = useState(5) //25 minutes in seconds
    const [timerGoing, setTimerGoing] = useState(false) //25 minutes in seconds

    const [showEditTask, setShowEditTask] = useState(false); //state for choosing to render the edit task or the sections
    const [showTimer, setShowTimer] = useState(false);
    const [selectedTask, setSelectedTask] = useState({}) //state for the current task User is looking at

    const [groupEdit, setgroupEdit] = useState(false); //used to force re-render after group edit

    var interval;
    useEffect(() => {
        if (timerGoing){
            var remove = 0;
            interval = setInterval(() => {
                setTimeData((timeData) => timeData - 1)
                console.log(timeData - remove)
                if (timeData - remove === 1) {
                    endTimer();
                    clearInterval(interval)
                }
                remove++;
            }, 1000)
        }
        else{
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [timerGoing]);

    function endTimer(){
        console.log('DONE')
    }

    function saveAllDataToLocalstorage(){
        localStorage.clear();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('groups', JSON.stringify(groups));
        localStorage.setItem('id', JSON.stringify(ID));
    }

    function inCaseNotLoaded() {
        if (tasks === null || groups === null){
            setTasks([]);
            setGroups([]);
        }
    }

    //flip-flops between the popup for editing and the main page
    function handleShowEditTask(){
        setShowEditTask(!showEditTask)
    }

    function handleShowTimer(){
        setShowTimer(!showTimer)
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
        saveAllDataToLocalstorage()
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
        saveAllDataToLocalstorage()
    }

    function createTask(){
        setID(ID + 1)
        const newTask = {
            taskID: ID,
            title: 'Unnamed', //title of task
            context: 'No Text', //text of task
            sectionID: 'not-started', //section task is in. Default to 'not-started'
            groupID: 'Ungrouped',
            timeStamp: null
        }
        setTasks([...tasks, newTask])
        handleSelectedTask(newTask)
        saveAllDataToLocalstorage()
    }

    const renderDisplay = (showEditTask) => {
        inCaseNotLoaded();
        return (
            <div className='background'>
                <div className='main-division'>
                    <span><Section exitEditGroup={exitEditGroup} handleSelectedTask={handleSelectedTask} stringData={{id: 'not-started', title: 'Not Started'}} data={tasks}></Section></span>
                    <span><Section exitEditGroup={exitEditGroup} handleSelectedTask={handleSelectedTask} stringData={{id: 'in-progress', title: 'In Progress'}} data={tasks}></Section></span>
                    <span><Section exitEditGroup={exitEditGroup} handleSelectedTask={handleSelectedTask} stringData={{id: 'complete', title: 'Complete'}}       data={tasks}></Section></span>
                </div>
                <span className='button-span'>
                    <button className='button-new' onClick={() => createTask()}>New Task</button>
                    <div className='pomodoro' ><Pomodoro timeData={timeData} setShowTimer={setShowTimer} setTimerGoing={setTimerGoing} /></div>
                </span>
                {showEditTask && (
                    <div className='modal'>
                        <div onClick={() => handleShowEditTask()} className="overlay"></div> {/* essentially the background, click to exit */}
                        <div className='modal-content'><EditTask exitEditTask={exitEditTask} taskData={selectedTask} exitEditGroup={exitEditGroup} groupData={groups}/></div>
                    </div> 
                )}
                {showTimer && (
                   <div className='modal'>
                        <div onClick={() => handleShowTimer()} className="overlay"></div> {/* essentially the background, click to exit */}
                        <div className='modal-content'><EditPomodoro /></div>
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
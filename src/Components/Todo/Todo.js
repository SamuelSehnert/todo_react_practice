/* eslint-disable react-hooks/exhaustive-deps */

import React, {useState, useEffect, useRef} from 'react'
import Section from './Section'
import EditTask from './EditTask'
import Pomodoro from './Pomodoro'
import EditPomodoro from './EditPomodoro'

import styled from 'styled-components'

const StyledBackground = styled.div`
    background-color: #D6FFD0;
`
const StyledMainDivision = styled.div`
    display: flex;
    justify-content: space-around;
`
const StyledButtonSpan = styled.span`
    display: flex;
    justify-content: center;
`
const StyledButtonNew = styled.button`
    background-color: #E54A4A;
    border: none;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 100%;

    position:fixed;
    bottom:0;
    right: 0;

    cursor: pointer;
`
const StyledPomodoro = styled.div`
    padding: 10px;
    text-align: center;
    border: 1px solid black;

    position:fixed;
    bottom:0;
    left:0;

    background-color: #E54A4A;
    color: white;
`
const StyledWorkOrBreak = styled.div`
    font-size: 25px;
`
const StyleModalContent = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.4;
    background: #f1f1f1;
    padding: 14px 28px;
    border-radius: 3px;
    max-width: 600px;
    min-width: 300px;
`
const StyledModal = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
`
const StyledOverlay = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    background: rgba(49,49,49,0.8);
`


export default function Todo() {

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')));
    const [groups, setGroups] = useState(JSON.parse(localStorage.getItem('groups')));
    const [ID, setID] = useState(Number(localStorage.getItem('id')));

    const [timeData, setTimeData] = useState(1500) // want to refractor out, but can't figure out the setTimeData() function
    const [allTime, setAllTime] = useState([1500, 300, 0]) //[work time, break time, stage : 0=work, 1=break]
    const [timerGoing, setTimerGoing] = useState(false) //25 minutes in seconds

    const [showEditTask, setShowEditTask] = useState(false); //state for choosing to render the edit task or the sections
    const [showEditTimer, setshowEditTimer] = useState(false);
    const [selectedTask, setSelectedTask] = useState({}) //state for the current task User is looking at

    const [groupEdit, setgroupEdit] = useState(false); //used to force re-render after group edit

    const childFunc = useRef();

    // var interval;
    useEffect(() => {
        if (timerGoing){
            var remove = 0;
            var interval = setInterval(() => {
                setTimeData((timeData) => timeData - 1)
                if (timeData - remove === 1) {
                    setTimerGoing(!timerGoing) //sets to false
                    childFunc.current();
                }
                remove++;
            }, 1000)
        }
        else{
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [timerGoing]);

    function nextStage(){
        if (allTime[2] === 1){
            setTimeData(allTime[0])
            setAllTime([allTime[0], allTime[1], 0])
        }
        else if (allTime[2] === 0){
            setTimeData(allTime[1])
            setAllTime([allTime[0], allTime[1], 1])
        } 
        setTimerGoing(!timerGoing)
    }

    function saveTimeData(newTimes){
        const workTime = (60 * newTimes[0]) + newTimes[1]
        const breakTime = (60 * newTimes[2]) + newTimes[3]

        setTimeData(workTime)
        allTime[0] = workTime;
        allTime[1] = breakTime;

        setshowEditTimer(!showEditTimer)
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

    function handleshowEditTimer(){
        setshowEditTimer(!showEditTimer)
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

    function renderWorkOrBreak(){
        if (allTime[2] === 0){
            return <StyledWorkOrBreak><strong>Work</strong></StyledWorkOrBreak>
        }
        else if (allTime[2] === 1){
            return <StyledWorkOrBreak><strong>Break</strong></StyledWorkOrBreak>
        }
    }

    const renderDisplay = (showEditTask) => {
        inCaseNotLoaded();
        return (
            <StyledBackground>
                <StyledMainDivision>
                    <span><Section exitEditGroup={exitEditGroup} handleSelectedTask={handleSelectedTask} stringData={{id: 'not-started', title: 'Not Started'}} data={tasks}></Section></span>
                    <span><Section exitEditGroup={exitEditGroup} handleSelectedTask={handleSelectedTask} stringData={{id: 'in-progress', title: 'In Progress'}} data={tasks}></Section></span>
                    <span><Section exitEditGroup={exitEditGroup} handleSelectedTask={handleSelectedTask} stringData={{id: 'complete', title: 'Complete'}}       data={tasks}></Section></span>
                </StyledMainDivision>
                <StyledButtonSpan>
                    <StyledButtonNew onClick={() => createTask()}>New Task</StyledButtonNew>
                    <StyledPomodoro>{renderWorkOrBreak()}<Pomodoro currentTime={timeData} secondTime={(allTime[2] === 0) ? allTime[1] : allTime[0]} setshowEditTimer={setshowEditTimer} setTimerGoing={setTimerGoing} timerGoing={timerGoing} nextStage={nextStage} childFunc={childFunc} /></StyledPomodoro>
                </StyledButtonSpan>
                {showEditTask && (
                    <StyledModal>
                        <StyledOverlay onClick={() => handleShowEditTask()}></StyledOverlay> {/* essentially the background, click to exit */}
                        <StyleModalContent><EditTask exitEditTask={exitEditTask} taskData={selectedTask} exitEditGroup={exitEditGroup} groupData={groups}/></StyleModalContent>
                    </StyledModal> 
                )}
                {showEditTimer && (
                   <StyledModal>
                        <StyledOverlay onClick={() => handleshowEditTimer()}></StyledOverlay> {/* essentially the background, click to exit */}
                        <StyleModalContent><EditPomodoro allTimeData={allTime} saveData={saveTimeData}/></StyleModalContent>
                    </StyledModal> 
                    )}
            </StyledBackground>
        )
    }

    return(
        <span>
            {renderDisplay(showEditTask)}
        </span>
    );
}

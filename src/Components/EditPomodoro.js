import React, { useState } from 'react'

import './../Style/EditPomodoro.module.css'

export default function EditPomodoro({allTimeData, saveData}) {

    const times = useState([0,0,0,0])
    const [isValid, setIsValid] = useState(true)

    const updateData = e => {
        times[e.target.name] = parseInt(e.target.value, 10);
    }

    function messageData(timeData, mode){
        var minutes = parseInt(timeData / 60, 10); 
        if (parseInt(minutes / 10, 10) === 0){
            minutes = '0' + minutes;
        }
        var seconds = parseInt(timeData % 60, 10);
        if (parseInt(seconds / 10, 10) === 0){
            seconds = '0' + seconds;
        }
        
        times[mode] = parseInt(minutes, 10);
        times[mode + 1] = parseInt(seconds, 10);

        return (
                <span>
                    <span><input className='input' name={mode} defaultValue={minutes} onChange={updateData}></input> : <input className='input' name={mode + 1} defaultValue={seconds} onChange={updateData}></input></span>
                </span>
                )
    }

    function checkSubmissionAndSave(){
        var correct = 0;
        if ( (times[0] === 0 && times[1] === 0) || (times[2] === 0 && times[3] === 0)){
            setIsValid(false)
            return
        }
        times.forEach( time => {
            if (Math.floor(time) === time && time >= 0){
                correct++;
            }
        })
        if (correct === times.length){
            setIsValid(true)
            saveData(times)
        }
        else{
            setIsValid(false)
        }
    }

    function conditionalReturn(bool){
        if (!bool){
            return <div>Enter valid, whole, positive integers!</div>
        }
    }

    return (
        <div className='full-section'>
            <div>
                <strong>Work Time</strong><br/>
            </div>
            <span>{messageData(allTimeData[0], 0)}</span>

            <div>
                <strong>Break Time</strong><br/>
            </div>
            <span>{messageData(allTimeData[1], 2)}</span>
            {conditionalReturn(isValid)}
            <div>
                <button onClick={() => checkSubmissionAndSave()}>Save</button>
            </div>
        </div>
    )
}

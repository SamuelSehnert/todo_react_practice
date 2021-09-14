import React, { useState } from 'react'

import './../Style/Pomodoro.module.css'

const Pomodoro = ({currentTime, secondTime, setshowEditTimer, setTimerGoing, timerGoing, nextStage}) => {

    const [isPaused, setIsPaused] = useState(false);

    function messageData(time){
        var output = ''

        var minutes = parseInt(time / 60, 10); 
        if (parseInt(minutes / 10, 10) === 0){
            output += '0' + minutes;
        }
        else{
            output += minutes
        }
        var seconds = parseInt(time % 60, 10);
        if (parseInt(seconds / 10, 10) === 0){
            output += ':0' + seconds;
        }
        else{
            output += ':' + seconds
        }
        return output
    }

    function conditionalButtonReturn(){
        if (isPaused && !timerGoing){
            return <button onClick={() => nextStage()}>Next</button>
        }
        else if (!isPaused){
            return <button onClick={() => { setIsPaused(!isPaused); setTimerGoing(true) }}>Start</button>
        }
        return <button onClick={() => { setIsPaused(!isPaused); setTimerGoing(false) }}>Stop</button>
    }

    return(
        <div className='total'>
            <div className='times'>
                <div className='top'>{messageData(currentTime)}</div>
                <div className='bot'>{messageData(secondTime)}</div>
            </div>
            <span className='button-span'>
                {conditionalButtonReturn()}
                <button onClick={() => { setshowEditTimer(true) }}>Edit</button>
            </span>
        </div>
    );
}

export default Pomodoro;
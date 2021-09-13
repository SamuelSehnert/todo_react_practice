import React, { useState } from 'react'

import './../Style/Pomodoro.module.css'

const Pomodoro = ({timeData, setshowEditTimer, setTimerGoing, timerGoing, nextStage}) => {

    const [isPaused, setIsPaused] = useState(false);

    function messageData(){
        var output = ''

        var minutes = parseInt(timeData / 60, 10); 
        if (parseInt(minutes / 10, 10) === 0){
            output += '0' + minutes;
        }
        else{
            output += minutes
        }
        var seconds = parseInt(timeData % 60, 10);
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
            <div>{messageData()}</div>
            <span className='button-span'>
                {conditionalButtonReturn()}
                <button onClick={() => { setshowEditTimer(true) }}>Edit</button>
            </span>
        </div>
    );
}

export default Pomodoro;
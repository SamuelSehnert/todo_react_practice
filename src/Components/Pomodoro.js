import React from 'react'

import './../Style/Pomodoro.module.css'

const Pomodoro = ({timeData, setShowTimer, setTimerGoing}) => {


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

    return(
        <div>
            <strong>Pomodoro</strong>
            <div>{messageData()}</div>
            <span>
                <button onClick={() => { setTimerGoing(true) }}>Start</button>
                <button onClick={() => { setShowTimer(true) }}>Edit</button>
            </span>
        </div>
    );
}

export default Pomodoro;
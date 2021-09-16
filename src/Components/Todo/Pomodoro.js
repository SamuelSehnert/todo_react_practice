import React, { useState, useEffect } from 'react'

import './../../Style/Pomodoro.module.css'

import bell from './../../bell.mp3'

const Pomodoro = ({currentTime, secondTime, setshowEditTimer, setTimerGoing, timerGoing, nextStage, childFunc}) => {

    const [isPaused, setIsPaused] = useState(false);
    const [, toggle] = useAudio(bell);

    useEffect(() => {
        childFunc.current = toggle
      }, [])

    function useAudio() {
        const [audio] = useState(new Audio(bell));
        const [playing, setPlaying] = useState(false);
      
        const toggle = () => setPlaying(!playing);
      
        useEffect(() => {
            playing ? audio.play() : audio.pause();
          },
          [playing]
        );
      
        useEffect(() => {
          audio.addEventListener('ended', () => setPlaying(false));
          return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
          };
        }, []);
      
        return [playing, toggle];
    };

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
        if (isPaused && !timerGoing && currentTime === 0){
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
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import styled from 'styled-components';

import bell from './../../bell.mp3'

const StyledTimes = styled.div`
    padding: 5px;
    > * {
        padding: 5px;
    }
`
const StyledTop = styled.div`
    font-size: 16px;
`
const StyledBot = styled.div`
    font-size: 12px;
`
const StyledButtonSpan = styled.span`
    display: flex;
    justify-content: center;
`

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
        if (isPaused && !timerGoing && currentTime <= 0){
            return <button onClick={() => nextStage()}>Next</button>
        }
        else if (!isPaused){
            return <button onClick={() => { setIsPaused(!isPaused); setTimerGoing(true) }}>Start</button>
        }
        return <button onClick={() => { setIsPaused(!isPaused); setTimerGoing(false) }}>Stop</button>
    }

    return(
        <div>
            <StyledTimes>
                <StyledTop>{messageData(currentTime)}</StyledTop>
                <StyledBot>{messageData(secondTime)}</StyledBot>
            </StyledTimes>
            <StyledButtonSpan>
                {conditionalButtonReturn()}
                <button onClick={() => { 
                    if (isPaused === true){
                        setIsPaused(!isPaused)
                        setTimerGoing(false)
                    }
                    // console.log(isPaused);
                    // console.log(timerGoing)
                    setshowEditTimer(true) 
                    }}>Edit</button>
            </StyledButtonSpan>
        </div>
    );
}

export default Pomodoro;